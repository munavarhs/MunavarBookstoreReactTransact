// Contains all the custom types we want to use for our application
import FirstLieWins from './assets/images/books/First Lie Wins.png';
import ItStartsWithUs from './assets/images/books/It starts with us.png';
import DinnerTonight from './assets/images/books/Dinner Tonight .png';
import GrowRich from './assets/images/books/Grow Rich.png';
import NeverLie from './assets/images/books/Never Lie.png';
import Mastery from './assets/images/books/Mastery.png';
export interface BookItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  isPublic: boolean;
  categoryId:number;
}



export interface CategoryNav{
  category:String;
}

export interface CatProp{
  catList:CategoryItem[];
}
export interface CategoryItem {
  categoryId: number;
  name: string;
}
export const categoryImages: Record<string, any> = {
  firstLieWins: FirstLieWins,
  itStartsWithUs : ItStartsWithUs,
  dinnerTonight : DinnerTonight,
  growRich : GrowRich,
  neverLie : NeverLie,
  mastery: Mastery
};

export class ShoppingCartItem {
  id:number;
  book: BookItem;
  quantity: number;

  constructor(theBook: BookItem) {
    this.id = theBook.bookId;
    this.book = theBook;
    this.quantity = 1;
  }
}
// this is used by the reducer. You can define it on the CartReducer
export const initialCartState:ShoppingCartItem[] =  [];

export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = [2024,2025,2026,2027,2028,2029,2030,2031,2032,2034,2035,2036,2037,2038];
export interface CustomerForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

export interface OrderDetails {
  order: Order;
  customer: Customer;
  books: BookItem[];
  lineItems: LineItem[];
}

export interface ServerErrorResponse {
  reason: string;
  message: string;
  fieldName: string;
  error: boolean;
}

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

export interface LineItem {
  bookId: number;
  orderId: number;
  quantity: number;
}
export interface Customer {
  customerName: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpDate: number;
}

