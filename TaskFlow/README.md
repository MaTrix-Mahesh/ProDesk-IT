# TaskFlow

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js). This project was developed as part of Sprint 14 to demonstrate authentication, protected routes, and CRUD operations.

## Features

- **User Authentication** — Register and login with JWT-based authentication
- **Protected Routes** — Dashboard and task endpoints are accessible only to authenticated users
- **Task Management** — View, create, update, and delete tasks (API ready, frontend dashboard displays tasks)
- **Responsive UI** — Clean, modern interface built with React and custom CSS
- **API Proxy** — Vite dev server proxies `/api` requests to the backend

## Tech Stack

### Frontend

| Technology   | Purpose                  |
|--------------|--------------------------|
| React 18     | UI library               |
| React Router DOM 6 | Client-side routing |
| Axios        | HTTP client              |
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
│   │   ├── authController.js    # Register & login logic
│   │   └── taskController.js    # Task CRUD logic (placeholder)
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification middleware
│   ├── models/
│   │   └── User.js              # User schema (name, email, password)
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── taskRoutes.js        # Task endpoints (protected)
│   ├── .env.example             # Environment variable template
│   ├── package.json
│   └── server.js                # Express app entry point
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx  # Route guard component
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx       # Main dashboard view
│   │   │   ├── Login.jsx           # Login page
│   │   │   └── Register.jsx        # Registration page
│   │   ├── services/
│   │   │   └── api.js              # Axios instance & API functions
│   │   ├── App.css                 # App-level styles
│   │   ├── App.jsx                 # Root component with routes
│   │   ├── index.css               # Global styles
│   │   └── main.jsx                # React entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js              # Vite config with API proxy
├── .gitignore                      # Root gitignore (optional)
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
    "email": "john@example.com"
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
    "id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Tasks (Protected — requires Bearer token)

| Method | Endpoint           | Description        | Auth Required |
|--------|--------------------|--------------------|---------------|
| GET    | `/api/tasks`       | Get all tasks      | Yes           |
| POST   | `/api/tasks`       | Create a new task  | Yes           |
| PUT    | `/api/tasks/:id`   | Update a task      | Yes           |
| DELETE | `/api/tasks/:id`   | Delete a task      | Yes           |

> **Note:** Task endpoints currently return placeholder data. Full database integration is pending implementation of the Task model.

## Authentication Flow

1. User registers or logs in via the frontend form
2. Backend validates credentials and returns a JWT token
3. Frontend stores the token in `localStorage`
4. Axios interceptor automatically attaches the token as a `Bearer` header to all subsequent requests
5. Backend `authMiddleware` verifies the token on protected routes
6. On logout, the token is removed from `localStorage` and the user is redirected to the login page

## Database

- **Database:** MongoDB
- **ODM:** Mongoose 8
- **Collections:**
  - `users` — Stores user documents with hashed passwords

### User Schema

| Field    | Type   | Constraints                        |
|----------|--------|------------------------------------|
| name     | String | Required, trimmed                  |
| email    | String | Required, unique, lowercase        |
| password | String | Required, min 6 chars, not selected by default |

Passwords are automatically hashed using bcryptjs (salt rounds: 10) before being saved.

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

## Build & Deployment

### Build the frontend

```bash
cd frontend
npm run build
```

This generates a `dist/` folder with optimized static assets.

### Deployment options

- **Backend:** Deploy to [Render](https://render.com/), [Railway](https://railway.app/), [Heroku](https://heroku.com/), or any Node.js hosting platform
- **Frontend:** Deploy the `dist/` folder to [Vercel](https://vercel.com/), [Netlify](https://netlify.com/), or serve it from the backend's static folder
- **Database:** Use [MongoDB Atlas](https://www.mongodb.com/atlas) for a cloud database

Make sure to set the environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`, `CLIENT_URL`) on your hosting platform.

## Screenshots

> Screenshots will be added here once the UI is finalized.

| Page        | Preview |
|-------------|---------|
| Login       | —       |
| Register    | —       |
| Dashboard   | —       |

## Future Improvements

- [ ] Implement Task model and full CRUD with database persistence
- [ ] Add task creation and editing forms in the frontend
- [ ] Add task filtering and search functionality
- [ ] Implement pagination for task lists
- [ ] Add user profile management
- [ ] Add dark mode support
- [ ] Write unit and integration tests
- [ ] Add input validation on both client and server
- [ ] Implement refresh token rotation
- [ ] Add email verification on registration
- [ ] Dockerize the application for easier deployment

## Troubleshooting

### MongoDB connection fails

- Ensure MongoDB is running locally (`mongod`) or your Atlas connection string is correct
- Check that `MONGO_URI` in `.env` is properly formatted
- Verify network access in MongoDB Atlas (allow your IP address)

### CORS errors

- Ensure `CLIENT_URL` in `backend/.env` matches your frontend URL (default: `http://localhost:5173`)
- Restart the backend after changing environment variables

### "Not authorized" errors

- Your token may have expired (tokens expire after 7 days)
- Log out and log in again to get a fresh token
- Clear `localStorage` in your browser

### Port already in use

- Change the `PORT` value in `backend/.env` to a different port
- Update the proxy target in `frontend/vite.config.js` accordingly

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