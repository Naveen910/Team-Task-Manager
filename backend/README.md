Base URL:
http://localhost:5001/api

Auth
POST /api/auth/signup
POST /api/auth/login

Projects
POST /api/projects — create project
GET /api/projects — get all projects for the logged-in user
GET /api/projects/:id — get one project by ID

Tasks
POST /api/tasks — create task
PATCH /api/tasks/:id — update task
GET /api/tasks — get all tasks for the logged-in user
GET /api/tasks/project/:projectId — get tasks for a specific project

Users
GET /api/users — get all users
GET /api/users/project/:projectId — get members of a project

Health/root
GET / — returns API running
