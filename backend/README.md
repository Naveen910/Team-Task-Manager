### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## 🧪 How to Run Locally

### Backend

```
cd backend
npm install
npm run dev
```

---

## ⚙️ API Overview

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Projects

- `GET /api/projects`
- `POST /api/projects`
- `POST /api/projects/:id/members`
- `DELETE /api/projects/:id/members/:userId`

### Tasks

- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `GET /api/tasks/project/:projectId`
