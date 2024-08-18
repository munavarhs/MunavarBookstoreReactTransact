package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.DateTimeException;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;
	private OrderDao orderDao;

	private LineItemDao lineItemDao;

	private CustomerDao customerDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	public void setOrderDao(OrderDao orderDao) { this.orderDao = orderDao; }

	public void setLineItemDao(LineItemDao lineItemDao) { this.lineItemDao = lineItemDao; }

	public void setCustomerDao(CustomerDao customerDao) { this.customerDao = customerDao; }

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		Order order = orderDao.findByOrderId(orderId);
		Customer customer = customerDao.findByCustomerId(order.customerId());
		List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
		List<Book> books = lineItems
				.stream()
				.map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
				.toList();
		return new OrderDetails(order, customer, lineItems, books);
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		// NOTE: MORE CODE PROVIDED NEXT PROJECT
		try (Connection connection = JdbcUtils.getConnection()) {
			Date ccExpDate = getCardExpirationDate(
					customerForm.getCcExpiryMonth(),
					customerForm.getCcExpiryYear());
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					ccExpDate, cart, connection);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error during close connection for customer order", e);
		}
	}

	private boolean isPhoneValid(String phone) {
		String newNumber = phone.replaceAll("[^0-9]", "");

		if (newNumber.length() == 10) {
			return true;
		} else {
			System.out.println("Invalid phone number: " + phone);
			return false;
		}
	}

	private boolean isEmailValid(String email) {
		if (email.contains(" ")) {
			return false;
		}

		if (!email.contains("@")) {
			return false;
		}

		if (email.endsWith(".")) {
			return false;
		} return true;
	}

	private boolean isCreditCardValid(String ccNumber) {
		String cleanedNumber = ccNumber.replaceAll("[\\s-]", "");

		int length = cleanedNumber.length();
		if (length >= 14 && length <= 16) {
			return true;
		} else {
			return false;
		}
	}



	private void validateCustomer(CustomerForm customerForm) {

    	String name = customerForm.getName();

		if (name == null || name.equals("") || name.length() > 45 || name.length() < 4) {
			throw new ApiException.ValidationFailure("name","Invalid name field");
		}

		// TODO: Validation checks for address, phone, email, ccNumber
		if (customerForm.getAddress() == null || customerForm.getAddress().equals("") || customerForm.getAddress().length() > 45) {
			throw new ApiException.ValidationFailure("address", "Invalid address field");
		}

		// check if phone is valid. after removing spaces, dashes and patterns like (123) 456-7890 it must be 10 digits
		String phone = customerForm.getPhone();
		if (phone == null || phone.equals("") || isPhoneValid(phone) == false) {
			throw new ApiException.ValidationFailure("phone", "Invalid phone field");
		}

		String email = customerForm.getEmail();
		if (email == null || email.equals("") || isEmailValid(email) == false) {
			throw new ApiException.ValidationFailure("email","Invalid email field");
		}

		String ccNumber = customerForm.getCcNumber();

		if (ccNumber == null || ccNumber.equals("") || isCreditCardValid(ccNumber) == false) {
			throw new ApiException.ValidationFailure("Invalid credit card number");
		}

		if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("Invalid expiry date");

		}
	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {

		// TODO: return true when the provided month/year is before the current month/yeaR
		// HINT: Use Integer.parseInt and the YearMonth class
		if (ccExpiryMonth == null || ccExpiryYear == null || ccExpiryMonth.equals("") || ccExpiryYear.equals("")) {
			return true;
		}

		if (Integer.parseInt(ccExpiryMonth) < 10) {
			ccExpiryMonth = "0" + ccExpiryMonth;
		}

		String inputMonthYear = ccExpiryMonth + "/" + ccExpiryYear;

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/yyyy");
		try {
			YearMonth currentMonthYear = YearMonth.now();
			YearMonth inputMonthYearObj = YearMonth.parse(inputMonthYear, formatter);
			return inputMonthYearObj.isBefore(currentMonthYear);
		}
		catch (DateTimeException e) {
			throw new ApiException.ValidationFailure("expDate", "Invalid expiry date");
		}



	}

	private void validateCart(ShoppingCart cart) {

		if (cart.getItems().size() <= 0) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}

		cart.getItems().forEach(item-> {
			if (item.getQuantity() < 0 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Invalid quantity");
			}
			Book databaseBook = bookDao.findByBookId(item.getBookId());
			// TODO: complete the required validations
			List<Book> databaseCategory = bookDao.findByCategoryId(item.getBookForm().getCategoryId());

			if (databaseCategory == null) {
				throw new ApiException.ValidationFailure("Invalid Category");
			}

			if (databaseBook.price() != item.getBookForm().getPrice()) {
				throw new ApiException.ValidationFailure("Invalid price");
			}
		});
	}

	private Date getCardExpirationDate(String monthString, String yearString) {
		int month = Integer.parseInt(monthString);
		int year = Integer.parseInt(yearString);
		Date date = new GregorianCalendar(year, month - 1, 01).getTime();
		return date;
	}

	private long performPlaceOrderTransaction(
			String name, String address, String phone,
			String email, String ccNumber, Date date,
			ShoppingCart cart, Connection connection) {
		try {
			connection.setAutoCommit(false);
			long customerId = customerDao.create(
					connection, name, address, phone, email,
					ccNumber, date);
			long customerOrderId = orderDao.create(
					connection,
					cart.getComputedSubtotal() + cart.getSurcharge(),
					generateConfirmationNumber(), customerId);
			for (ShoppingCartItem item : cart.getItems()) {
				lineItemDao.create(connection, customerOrderId,
						item.getBookId(), item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			return 0;
		}
	}

	private int generateConfirmationNumber() {
		return ThreadLocalRandom.current().nextInt(999999999);
	}

}
