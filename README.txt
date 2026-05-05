# 🚀 Team Task Manager (Full-Stack)

A full-stack web application to manage projects, assign tasks, and track progress with role-based access (Admin / Member).

---

## 🌐 Live Application

👉 https://zoological-smile-production-42a9.up.railway.app

---

## 🔐 Test Credentials
### 👑 Admin Access

* Email: admin@gmail.com
* Password: admin

## 📂 GitHub Repository

👉 https://github.com/Naveen910/Team-Task-Manager

---

## 📌 Features

### 🔐 Authentication

* User Signup & Login (JWT-based)
* Secure password hashing using bcrypt
* Persistent login with localStorage

### 👥 Role-Based Access

* **Admin**

  * Create projects
  * Add/remove team members
  * Assign tasks

* **Member**

  * View assigned projects
  * Update task status

### 📁 Project Management

* Create & manage projects
* Add/remove team members dynamically
* View project details

### ✅ Task Management

* Create tasks with:

  * Title, description
  * Priority (Low / Medium / High)
  * Status (Todo / In Progress / Review / Done)
  * Due date
* Assign tasks to team members
* Update task status

### 📊 Dashboard

* Total tasks
* Completed tasks
* In-progress tasks
* Overdue tasks

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Deployment

* Railway (Frontend + Backend + Database)

---

## ⚙️ API Overview

### Auth

* `POST /api/auth/signup`
* `POST /api/auth/login`

### Projects

* `GET /api/projects`
* `POST /api/projects`
* `POST /api/projects/:id/members`
* `DELETE /api/projects/:id/members/:userId`

### Tasks

* `GET /api/tasks`
* `POST /api/tasks`
* `PATCH /api/tasks/:id`
* `GET /api/tasks/project/:projectId`

---

## 🧪 How to Run Locally

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 💡 Highlights

* Full-stack architecture with clean separation
* Role-based access control
* Real-time UI updates
* Production deployment on Railway
* Scalable project structure

---

## 🏁 Conclusion

This project demonstrates the ability to build, deploy, and manage a complete full-stack application with authentication, role-based access, and real-world features.

---
