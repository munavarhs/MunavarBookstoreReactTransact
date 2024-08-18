
package business;

import business.book.BookDao;
import business.book.BookDaoJdbc;
import business.category.CategoryDao;
import business.category.CategoryDaoJdbc;
import business.customer.CustomerDao;
import business.customer.CustomerDaoJdbc;
import business.order.*;

public class ApplicationContext {

    // TODO Add field and complete the getter for bookDao

    private CategoryDao categoryDao;
    private BookDao bookDao;

    private OrderService orderService;

    private OrderDao orderDao;

    private LineItemDao lineItemDao;

    private CustomerDao customerDao;

    public static ApplicationContext INSTANCE = new ApplicationContext();


    private ApplicationContext() {
        categoryDao = new CategoryDaoJdbc();
        bookDao = new BookDaoJdbc();
        orderService = new DefaultOrderService();
        ((DefaultOrderService)orderService).setBookDao(bookDao);
        orderDao = new OrderDaoJdbc();
        ((DefaultOrderService)orderService).setOrderDao(orderDao);
        lineItemDao = new LineItemDaoJdbc();
        ((DefaultOrderService)orderService).setLineItemDao(lineItemDao);
        customerDao = new CustomerDaoJdbc();
        ((DefaultOrderService)orderService).setCustomerDao(customerDao);
    }




    public CategoryDao getCategoryDao() {
        return categoryDao;
    }

    public BookDao getBookDao() { return bookDao; }

    public OrderService getOrderService() { return orderService; }

    public OrderDao getOrderDao() { return orderDao; }

    public LineItemDao getLineItemDao() { return lineItemDao; }

    public CustomerDao getCustomerDao() { return customerDao; }

}
