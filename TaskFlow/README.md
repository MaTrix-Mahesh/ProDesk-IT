# TaskMatrix AI

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js). This project was developed as part of Sprint 15 to deliver a **feature-complete** application with full CRUD operations, ownership validation, and a modern responsive dashboard.

## Features

### Authentication
- **User Registration** — Create an account with name, email, and password
- **User Login** — Secure login with JWT-based authentication
- **Password Hashing** — Passwords hashed with bcryptjs (10 salt rounds)
- **Protected Routes** — Dashboard and task endpoints accessible only to authenticated users
- **Token Verification** — JWT middleware with proper error handling (expired/invalid tokens)
- **Auto Logout** — Automatic redirect to login on 401 responses

### Task Management (Full CRUD)
- **Create** — Create tasks with title, description, status, priority, and due date
- **Read** — Dashboard auto-loads tasks after login with loading/error/empty states
- **Update** — Edit tasks via modal with pre-filled data, updates UI without refresh
- **Delete** — Delete tasks with confirmation modal and optimistic UI (no page reload)
- **Ownership Validation** — Every task is tied to the logged-in user; 403 Forbidden on unauthorized access
- **Validation** — Missing fields, invalid ObjectId, document not found, unauthorized access, invalid JWT all return proper HTTP status codes

### Dashboard
- **Sidebar** — Navigation with Dashboard, My Tasks, Statistics, and Profile views
- **Navbar** — Sticky header with date, user info, and quick "New Task" button
- **Dashboard Cards** — Total, Completed, In Progress, and Pending task counts
- **Recent Activity** — Latest 5 tasks with status indicators
- **Statistics** — Task breakdown, high priority count, overdue count, and completion rate progress bar
- **User Profile** — Avatar, member since, task stats, and logout
- **Responsive Design** — Mobile-friendly with collapsible sidebar

## Tech Stack

### Frontend

| Technology   | Purpose                  |
|--------------|--------------------------|
| React 18     | UI library               |
| React Router DOM 6 | Client-side routing |
| Axios        | HTTP client with interceptors |
| Vite 6       | Build tool & dev server  |

### Backend

| Technology   | Purpose                  |
|--------------|--------------------------|
| Node.js      | Runtime environment      |
| Express 4    | Web framework            |
| MongoDB      | Database                 |
| Mongoose 8   | ODM for MongoDB          |
| JSON Web Token | Authentication         |
| bcryptjs     | Password hashing         |
| dotenv       | Environment variables    |
| cors         | Cross-origin requests    |
| nodemon      | Dev server auto-restart  |

## Folder Structure

```
taskflow/
├── backend/
│   ├── controllers/
│   │   ├── authController.js    # Register, login, get profile
│   │   └── taskController.js    # Full CRUD with ownership validation
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification middleware
│   ├── models/
│   │   ├── Task.js              # Task schema (userId, title, description, status, priority, dueDate)
│   │   └── User.js              # User schema (name, email, password)
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints (register, login, me)
│   │   └── taskRoutes.js        # Task CRUD endpoints (protected)
│   ├── .env.example             # Environment variable template
│   ├── package.json
│   ├── render.yaml              # Render deployment config
│   └── server.js                # Express app entry point
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmationModal.jsx  # Delete confirmation modal
│   │   │   ├── Navbar.jsx             # Dashboard navbar
│   │   │   ├── ProtectedRoute.jsx     # Route guard component
│   │   │   ├── Sidebar.jsx            # Dashboard sidebar
│   │   │   └── TaskFormModal.jsx      # Create/Edit task modal
│   │   ├── hooks/
│   │   │   └── useTasks.js            # Reusable task CRUD hook
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx          # Main dashboard with all views
│   │   │   ├── Login.jsx              # Login page
│   │   │   └── Register.jsx           # Registration page
│   │   ├── services/
│   │   │   └── api.js                 # Axios instance & API functions
│   │   ├── App.css                    # App-level styles
│   │   ├── App.jsx                    # Root component with routes
│   │   ├── index.css                  # Global styles
│   │   └── main.jsx                   # React entry point
│   ├── .env.example                   # Frontend environment template
│   ├── index.html
│   ├── package.json
│   ├── vercel.json                    # Vercel deployment config
│   └── vite.config.js                 # Vite config with API proxy
├── .gitignore
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [MongoDB](https://www.mongodb.com/) — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cloud database
- npm (comes with Node.js)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/MaTrix-Mahesh/ProDesk-IT.git
cd ProDesk-IT/taskflow
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Configure environment variables

#### Backend

Copy the example environment file and fill in your values:

```bash
cd ../backend
cp .env.example .env
```

Edit `backend/.env` with your configuration:

```env
# MongoDB Connection URI
MONGO_URI=mongodb://localhost:27017/taskflow

# JWT Secret Key (use a strong random string)
JWT_SECRET=your_super_secret_key_here

# Server Port (default: 5000)
PORT=5000

# Frontend Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

#### Frontend

```bash
cd ../frontend
cp .env.example .env
```

For local development, leave `VITE_API_URL` empty to use the Vite proxy.

## Running the Project

### Start the backend server

```bash
cd backend
npm run dev
```

The API will be available at `http://localhost:5000`.

### Start the frontend dev server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

The Vite dev server is configured to proxy `/api` requests to `http://localhost:5000`, so both servers must be running simultaneously.

## API Endpoints

### Authentication

| Method | Endpoint              | Description          | Auth Required |
|--------|-----------------------|----------------------|---------------|
| POST   | `/api/auth/register`  | Register a new user  | No            |
| POST   | `/api/auth/login`     | Login existing user  | No            |
| GET    | `/api/auth/me`        | Get current user    | Yes           |

**POST /api/auth/register**

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response (201):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**POST /api/auth/login**

Request body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "1d21b2b7d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Tasks (Protected — requires Bearer token)

| Method | Endpoint           | Description        | Auth Required |
|--------|--------------------|--------------------|---------------|
| GET    | `/api/tasks`       | Get all user tasks | Yes           |
| GET    | `/api/tasks/:id`   | Get task by ID     | Yes           |
| POST   | `/api/tasks`       | Create a new task  | Yes           |
| PUT    | `/api/tasks/:id`   | Update a task      | Yes           |
| DELETE | `/api/tasks/:id`   | Delete a task      | Yes           |

**POST /api/tasks**

Request body:
```json
{
  "title": "Complete Sprint 15",
  "description": "Finish all features",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2024-02-01"
}
```

Response (201):
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "1d21b2b7d0d8992e610c86",
    "userId": "1d21b2b7d0d8992e610c85",
    "title": "Write a Sprint 15",
    "description": "Finish all features",
    "status": "In Progress",
    "priority": "High",
    "dueDate": "2024-02-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses**

| Status | Description |
|--------|-------------|
| 400    | Missing fields, invalid ObjectId, validation error |
| 401    | Invalid JWT, expired token, no token provided |
| 403    | Forbidden — user does not own the resource |
| 404    | Task not found |
| 500    | Server error |

## Authentication Flow

1. User registers or logs in via the frontend form
2. Backend validates credentials and returns a JWT token
3. Frontend stores the token in `localStorage`
4. Axios interceptor automatically attaches the token as a `Bearer` header to all subsequent requests
5. Backend `authMiddleware` verifies the token on protected routes
6. On 401 responses, the frontend automatically clears storage and redirects to login
7. On logout, the token is removed from `localStorage` and the user is redirected to the login page

## Database

- **Database:** MongoDB
- **ODM:** Mongoose 8
- **Collections:**
  - `users` — Stores user documents with hashed passwords
  - `tasks` — Stores task documents with userId ownership reference

### User Schema

| Field    | Type   | Constraints                        |
|----------|--------|------------------------------------|
| name     | String | Required, trimmed                  |
| email    | String | Required, unique, lowercase        |
| password | String | Required, min 6 chars, not selected by default |

### Task Schema

| Field       | Type     | Constraints                        |
|-------------|----------|------------------------------------|
| userId      | ObjectId | Required, ref: User, indexed       |
| title       | String   | Required, max 120 chars            |
| description | String   | Optional, max 1000 chars           |
| status      | String   | Pending / In Progress / Completed  |
| priority    | String   | Low / Medium / High                |
| dueDate     | Date     | Optional                           |

## Scripts

### Backend

| Script        | Command              | Description                        |
|---------------|----------------------|------------------------------------|
| `npm install` | `npm install`        | Install backend dependencies       |
| `npm run dev` | `nodemon server.js`  | Start backend with auto-reload     |
| `npm start`   | `node server.js`     | Start backend in production mode   |

### Frontend

| Script          | Command           | Description                          |
|-----------------|-------------------|--------------------------------------|
| `npm install`   | `npm install`     | Install frontend dependencies        |
| `npm run dev`   | `vite`            | Start Vite dev server                |
| `npm run build` | `vite build`      | Build for production                 |
| `npm run preview` | `vite preview`  | Preview production build locally     |

## Deployment

### Frontend — Vercel

1. Push the repository to GitHub
2. Import the project in [Vercel](https://vercel.com/)
3. Set the **Root Directory** to `frontend`
4. Add the environment variable:
   - `VITE_API_URL` = your Render backend URL (e.g., `https://taskmatrix-backend.onrender.com`)
5. Deploy

The `vercel.json` file handles SPA routing rewrites.

### Backend — Render

1. Push the repository to GitHub
2. Create a new **Web Service** in [Render](https://render.com/)
3. Connect the repository
4. Set the **Root Directory** to `backend`
5. Add the environment variables:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = a strong random string
   - `CLIENT_URL` = your Vercel frontend URL
   - `PORT` = 5000
6. Deploy

The `render.yaml` file provides a blueprint for automated deployment.

### Database — MongoDB Atlas

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a database user
3. Add your IP address to the access list
4. Get the connection string and set it as `MONGO_URI` in both environments

## Troubleshooting

### MongoDB connection fails

- Ensure MongoDB is running locally (`mongod`) or your Atlas connection string is correct
- Check that `MONGO_URI` in `.env` is properly formatted
- Verify network access in MongoDB Atlas (allow your IP address)

### CORS errors

- Ensure `CLIENT_URL` in `backend/.env` matches your frontend URL (default: `http://localhost:5173`)
- For production, set `CLIENT_URL` to your Vercel URL
- Restart the backend after changing environment variables

### "Not authorized" errors

- Your token may have expired (tokens expire after 7 days)
- Log out and log in again to get a fresh token
- Clear `localStorage` in your browser

### Port already in use

- Change the `PORT` value in `backend/.env` to a different port
- Update the proxy target in `frontend/vite.config.js` accordingly

## Future Scope

- [ ] Add task filtering and search functionality
- [ ] Implement pagination for task lists
- [ ] Add drag-and-drop task board (Kanban view)
- [ ] Add email notifications for due dates
- [ ] Add dark mode support
- [ ] Write unit and integration tests
- [ ] Implement refresh token rotation
- [ ] Add email verification on registration
- [ ] Add team collaboration and shared tasks
- [ ] Dockerize the application for easier deployment
- [ ] Add file attachments to tasks
- [ ] Add activity log/history for each task

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate comments.

## License

This project is licensed under the ISC License.