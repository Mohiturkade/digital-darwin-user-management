# Darwin Digitech - User Management System

A secure, responsive, and user-friendly User Management application built with React.js as part of the Darwin Digitech React JS Assessment.

The application provides authentication, session management, user CRUD operations, search, filtering, sorting, pagination, responsive layouts, and dashboard analytics.

## 🚀 Live Demo

Live Application: https://YOUR-NETLIFY-URL.netlify.app

GitHub Repository: https://github.com/Mohiturkade/digital-darwin-user-management

---

## 📌 Features

### Authentication

- Login with username and password
- Authentication using DummyJSON API
- Bearer token-based authentication
- Authentication state managed using React Context API
- Persistent login using localStorage
- Logout functionality
- Invalid credential error handling
- Toast notifications for login success/failure

### Session Management

- User authentication state is restored when the application starts
- Access token is stored securely in localStorage for the application session
- User can logout manually
- Idle timeout mechanism logs the user out after 1 hour of inactivity
- User is redirected to the login page after session expiration

### User Directory

- Fetch users from REST API
- Pagination
- Search users
- Filter users by gender
- Sort users by:
  - Name A-Z
  - Name Z-A
  - Age Low to High
  - Age High to Low
- List View
- Grid View
- Responsive design

### CRUD Operations

- Add new users
- Edit existing users
- Delete users
- Reusable User Form for Add and Edit
- Success and error toast notifications
- UI updates immediately after CRUD operations

### Dashboard

- Dashboard overview
- User statistics
- Analytics
- Navigation sidebar
- Responsive layout

### UI/UX

- Responsive design
- Clean and modern interface
- Loading states
- Skeleton loading
- Search loading indicator
- Empty states
- Confirmation before deleting users
- Toast notifications
- Mobile-friendly navigation

---

# 🛠️ Tech Stack

- React.js
- JavaScript
- React Router
- Axios
- Tailwind CSS
- React Hot Toast
- Context API
- DummyJSON REST API
- Vite
- Git & GitHub
- Netlify

---

# 📂 Project Structure

```text
src/
│
├── components/
│   ├── common/
│   │   ├── Modal.jsx
│   │   └── ...
│   │
│   ├── users/
│   │   └── UserForm.jsx
│   │
│   ├── DashboardLayout.jsx
│   └── Sidebar.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── hooks/
│   └── useAuth.js
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   └── Users.jsx
│
├── services/
│   ├── api.js
│   ├── authApi.js
│   └── userApi.js
│
├── App.jsx
├── main.jsx
└── index.css