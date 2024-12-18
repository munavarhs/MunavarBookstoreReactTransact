# React Bookstore

A full-stack React Bookstore web application with a **Java Spring Boot** backend and **SQL database** for data storage. This project allows users to browse books, manage inventory, and perform CRUD operations efficiently.

---

## **Features**

### **Frontend (React)**
- **Dynamic Book Listings**: Display available books with details like title, author, price, and availability.
- **CRUD Operations**: Add, edit, and delete books with ease.
- **Search and Filter**: Search for books by title, author, or category.
- **Responsive UI**: Ensures seamless user experience across devices.

### **Backend (Java Spring Boot)**
- **RESTful APIs**: Endpoints for performing CRUD operations on book data.
- **Database Integration**: SQL database to store book records securely.
- **Error Handling**: Ensures smooth operations with proper exception management.

---

## **Tech Stack**

### **Frontend**
- React.js
- HTML5, CSS3
- Axios (API Integration)
- React Router

### **Backend**
- Java Spring Boot
- RESTful APIs
- SQL Database (MySQL/PostgreSQL)

### **Tools**
- Node.js
- Maven
- Visual Studio Code / IntelliJ IDEA
- Postman (API Testing)

---

## **Installation**

### **Prerequisites**
Ensure you have the following installed:
- Node.js
- Java (JDK 11 or higher)
- Maven
- MySQL or PostgreSQL

### **Setup**

1. **Clone the repository**
   ```bash
   git clone https://github.com/munavarhs/MunavarBookstoreReactTransact.git
   cd react-bookstore
   ```

2. **Install dependencies** (Frontend):
   ```bash
   cd client
   npm install
   ```

3. **Run the Frontend**:
   ```bash
   npm start
   ```

4. **Backend Setup**:
   - Navigate to the backend folder.
   ```bash
   cd backend
   ```
   - Use Maven to build the project.
   ```bash
   mvn spring-boot:run
   ```

5. **Database Setup**:
   - Create a new database (e.g., `react_bookstore`).
   - Update database credentials in `application.properties`:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/react_bookstore
     spring.datasource.username=YOUR_USERNAME
     spring.datasource.password=YOUR_PASSWORD
     ```

6. **Verify**: Access the app at `http://localhost:3000` and ensure APIs work on `http://localhost:8080`.

---

## **Endpoints**
| Method   | Endpoint         | Description               |
|----------|-----------------|---------------------------|
| GET      | /api/books       | Retrieve all books        |
| GET      | /api/books/{id}  | Retrieve a book by ID     |
| POST     | /api/books       | Add a new book            |
| PUT      | /api/books/{id}  | Update book details       |
| DELETE   | /api/books/{id}  | Delete a book by ID       |

---



## **Future Improvements**
- Add user authentication for secure book management.
- Implement reviews and ratings for books.
- Integrate payment gateway for purchasing books.

---

## **Contributing**
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project.
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add YourFeatureName"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. Open a pull request.
