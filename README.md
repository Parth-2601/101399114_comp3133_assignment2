# Employee Management System (COMP 3133 Assignment 2)

This is a full-stack web application built using **Angular** for the frontend and **Node.js with GraphQL** for the backend. It allows user authentication and management of employee records, including CRUD operations and file uploads.

---

## 🚀 Features

- **User Authentication** (Login & Signup)
- **JWT-based session management**
- **Employee CRUD operations** using GraphQL
- **Search by department or designation**
- **Profile picture upload**
- **Authorization: Users can only see their added employees**
- Responsive and professional UI using Angular & Bootstrap
- Secure file upload and API access

---

## 🧪 Technologies Used

- **Frontend**: Angular 17 (Standalone Components, Reactive Forms)
- **Backend**: Node.js, Express, Apollo Server, GraphQL
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 🔐 Authentication

- Users can sign up and log in.
- JWT is stored in `localStorage` and sent as `Authorization: Bearer <token>` header for authenticated GraphQL requests.
- Employees are stored per user, i.e., each user only sees and manages their own employees.

---

## ⚙️ Environment Variables

In the backend, create a `.env` file:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

## 📌 Student Info
- Name: Parthkumar Patel

- Student ID: 101399114