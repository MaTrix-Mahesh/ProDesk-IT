<div align="center">
  <h1>📋 TaskMatrix</h1>
  <p><strong>Enterprise Project Management Platform</strong></p>
  <p>
    <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version 1.0.0" />
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="MIT License" />
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
    <img src="https://img.shields.io/badge/status-active-success.svg" alt="Status Active" />
  </p>
</div>

---

## 📖 Project Description

**TaskMatrix** is a full-stack, enterprise-grade project management application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It enables teams to organize, track, and manage projects and tasks with real-time collaboration, role-based access control, and high-performance caching via **Redis**.

This project was developed as a **Capstone Project** for **ProDesk IT** and demonstrates production-ready software engineering practices including secure authentication, RESTful API design, WebSocket-based real-time updates, and a scalable caching architecture.

---

## ✨ Features

### Core Features
- **User Authentication & Authorization** — JWT-based access & refresh tokens, role-based access (admin, manager, member)
- **Organization Management** — Create and manage organizations with team membership
- **Project Management** — Full CRUD for projects with unique project keys
- **Task Management** — Kanban-style board with drag-and-drop, task types, priorities, statuses, labels, and time tracking
- **Real-Time Collaboration** — WebSocket (Socket.IO) for live updates on tasks, comments, and notifications
- **Comment System** — Threaded comments on tasks
- **Activity Logging** — Track all user actions across the platform
- **Dashboard & Analytics** — Visual insights with charts (Recharts)
- **Notifications** — Real-time in-app notifications
- **Invitation System** — Send and manage team invitations
- **Profile Management** — Avatar upload via Cloudinary, personal settings
- **Calendar View** — Task scheduling and deadline visualization

### Redis Caching (Sprint 13)
- **Read-through caching** for property listings with sub-millisecond response times
- **Cache-aside strategy** with explicit invalidation on write operations
- **Configurable TTL** per cache type (single property: 5 min, lists: 2 min, search: 1 min)
- **Graceful degradation** — application remains fully functional without Redis
- **Admin cache debug endpoints** for monitoring and manual invalidation

### Security Features
- Password hashing with bcrypt (12 rounds)
- JWT access/refresh token rotation
- HTTP-only cookies for refresh tokens
- Helmet.js for secure HTTP headers
- CORS with whitelisted origins
- Input validation & sanitization (express-validator, Zod)
- Rate limiting (express-rate-limit)
- XSS protection
- MongoDB injection prevention

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **Vite 8** | Build tool & dev server |
| **React Router v7** | Client-side routing |
| **Tailwind CSS v4** | Utility-first styling |
| **TanStack React Query v5** | Server state management & caching |
| **Zustand** | Client state management |
| **React Hook Form + Zod** | Form validation |
| **DnD Kit** | Drag-and-drop Kanban board |
| **Recharts** | Data visualization |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |
| **Sonner** | Toast notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB + Mongoose** | Database & ODM |
| **Redis (ioredis)** | In-memory caching |
| **Socket.IO** | Real-time WebSocket communication |
| **JWT (jsonwebtoken)** | Authentication |
| **Winston** | Logging |
| **Morgan** | HTTP request logging |
| **Helmet** | Security headers |
| **Compression** | Response compression |
| **Multer** | File upload handling |
| **Cloudinary SDK** | Media storage |
| **Nodemailer** | Email service |
| **Node-cron** | Scheduled tasks |
| **express-rate-limit** | Rate limiting |
| **express-validator** | Input validation |
| **Zod** | Schema validation |

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (React + Vite)                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │   Pages  │ │Components│ │   Hooks  │ │  Stores  │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘  │
│       └────────────┴────────────┴────────────┘         │
│                        │                                │
│              ┌─────────┴─────────┐                      │
│              │   React Query     │                      │
│              │   (Cache Layer)   │                      │
│              └─────────┬─────────┘                      │
│                        │                                │
│              ┌─────────┴─────────┐                      │
│              │   Axios (API)     │                      │
│              └─────────┬─────────┘                      │
└────────────────────────┼────────────────────────────────┘
                         │ HTTP / WebSocket
┌────────────────────────┼────────────────────────────────┐
│              ┌─────────┴─────────┐                      │
│              │   Express API     │                      │
│              │   (REST + WS)     │                      │
│              └─────────┬─────────┘                      │
│                        │                                │
│          ┌─────────────┼─────────────┐                  │
│          ▼             ▼             ▼                  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │ Middleware │ │ Controllers│ │  Services  │          │
│  │ (Auth,     │ │ (Route     │ │ (Business  │          │
│  │  Validate, │ │  Handlers) │ │  Logic)    │          │
│  │  Cache)    │ │            │ │            │          │
│  └────────────┘ └────────────┘ └────────────┘          │
│                        │                                │
│          ┌─────────────┼─────────────┐                  │
│          ▼             ▼             ▼                  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │  MongoDB   │ │   Redis    │ │  Socket.IO │          │
│  │ (Primary)  │ │  (Cache)   │ │ (Real-time)│          │
│  └────────────┘ └────────────┘ └────────────┘          │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
prodesk-capstone-taskmatrix/
├── .gitignore
├── README.md
├── docs/
│   └── sprint-13-redis-caching-architecture.md
│
├── client/                          # React Frontend
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── public/
│   └── src/
│       ├── main.jsx                 # Entry point
│       ├── App.jsx                  # Root component
│       ├── index.css                # Global styles (Tailwind)
│       ├── app/
│       │   ├── App.jsx              # App with providers
│       │   ├── providers.jsx        # Context providers
│       │   └── queryClient.js       # React Query config
│       ├── routes/
│       │   └── index.jsx            # Route definitions
│       ├── layouts/
│       │   ├── AuthLayout.jsx       # Auth pages layout
│       │   └── MainLayout.jsx       # Main app layout
│       ├── components/
│       │   ├── Sidebar.jsx          # Navigation sidebar
│       │   ├── Navbar.jsx           # Top navigation bar
│       │   ├── Column.jsx           # Kanban column
│       │   └── TaskCard.jsx         # Task card component
│       ├── pages/
│       │   ├── auth/
│       │   │   ├── LoginPage.jsx
│       │   │   └── RegisterPage.jsx
│       │   ├── DashboardPage.jsx
│       │   ├── ProjectsPage.jsx
│       │   ├── ProjectDetailPage.jsx
│       │   ├── BoardPage.jsx
│       │   ├── CalendarPage.jsx
│       │   ├── OrganizationPage.jsx
│       │   ├── TeamPage.jsx
│       │   ├── ProfilePage.jsx
│       │   ├── SettingsPage.jsx
│       │   └── NotFoundPage.jsx
│       ├── hooks/
│       │   └── useAuth.js           # Auth hook
│       ├── services/
│       │   └── api.js               # Axios API client
│       ├── store/
│       │   └── authStore.js         # Zustand auth store
│       └── utils/
│           └── cn.js                # Classname utility
│
└── server/                          # Express Backend
    ├── package.json
    ├── .env.example
    └── src/
        ├── server.js                # HTTP server entry
        ├── app.js                   # Express app setup
        ├── config/
        │   ├── db.js                # MongoDB connection
        │   ├── jwt.js               # JWT configuration
        │   └── cloudinary.js        # Cloudinary config
        ├── models/
        │   ├── User.js
        │   ├── Project.js
        │   ├── Task.js
        │   ├── Comment.js
        │   ├── Organization.js
        │   ├── OrganizationMember.js
        │   ├── RefreshToken.js
        │   ├── Notification.js
        │   ├── ActivityLog.js
        │   └── Invitation.js
        ├── routes/
        │   ├── index.js             # Route aggregator
        │   ├── auth.routes.js
        │   ├── profile.routes.js
        │   ├── project.routes.js
        │   ├── task.routes.js
        │   ├── comment.routes.js
        │   ├── organization.routes.js
        │   ├── notification.routes.js
        │   ├── activity.routes.js
        │   ├── dashboard.routes.js
        │   ├── invitation.routes.js
        │   └── health.js
        ├── controllers/
        │   ├── auth.controller.js
        │   ├── profile.controller.js
        │   ├── project.controller.js
        │   ├── task.controller.js
        │   ├── comment.controller.js
        │   ├── organization.controller.js
        │   ├── notification.controller.js
        │   ├── activity.controller.js
        │   ├── dashboard.controller.js
        │   └── invitation.controller.js
        ├── services/
        │   ├── auth.service.js
        │   ├── token.service.js
        │   ├── project.service.js
        │   ├── task.service.js
        │   ├── comment.service.js
        │   ├── organization.service.js
        │   ├── notification.service.js
        │   ├── activity.service.js
        │   ├── dashboard.service.js
        │   └── invitation.service.js
        ├── middleware/
        │   ├── auth.middleware.js    # JWT protect & authorize
        │   └── error.middleware.js   # Error handling
        ├── validators/
        │   ├── auth.validator.js
        │   ├── project.validator.js
        │   ├── task.validator.js
        │   ├── comment.validator.js
        │   └── organization.validator.js
        ├── utils/
        │   ├── ApiError.js          # Custom error class
        │   ├── ApiResponse.js       # Standard response class
        │   ├── asyncHandler.js      # Async error wrapper
        │   ├── generateTokens.js    # JWT token generation
        │   ├── cookies.js           # Cookie helpers
        │   └── logger.js            # Winston logger
        └── socket/
            └── index.js             # Socket.IO setup
```

---

## 🗄 Database Schema Summary

### User
| Field | Type | Description |
|-------|------|-------------|
| `firstName` | String | Required, max 50 chars |
| `lastName` | String | Required, max 50 chars |
| `username` | String | Unique, 3-30 chars |
| `email` | String | Unique, lowercase |
| `password` | String | Hashed (bcrypt, 12 rounds), select: false |
| `role` | Enum | `admin`, `manager`, `member` |
| `isActive` | Boolean | Soft-delete flag |
| `avatar` | Object | `{ url, public_id }` |
| `refreshToken` | String | select: false |

### Organization
| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Required |
| `slug` | String | Unique, URL-friendly |
| `owner` | ObjectId | Ref: User |
| `members` | [ObjectId] | Ref: User |

### Project
| Field | Type | Description |
|-------|------|-------------|
| `organization` | ObjectId | Ref: Organization |
| `name` | String | Required, max 100 chars |
| `key` | String | Unique per org, max 10 chars |
| `owner` | ObjectId | Ref: User |
| `members` | [ObjectId] | Ref: User |
| `status` | Enum | `active`, `archived` |

### Task
| Field | Type | Description |
|-------|------|-------------|
| `project` | ObjectId | Ref: Project |
| `title` | String | Required, max 200 chars |
| `type` | Enum | `task`, `bug`, `feature`, `improvement`, `epic` |
| `status` | Enum | `backlog`, `todo`, `in_progress`, `in_review`, `done`, `cancelled` |
| `priority` | Enum | `none`, `low`, `medium`, `high`, `urgent` |
| `assignee` | ObjectId | Ref: User |
| `reporter` | ObjectId | Ref: User |
| `order` | Number | Kanban ordering |
| `dueDate` | Date | Task deadline |
| `estimatedHours` | Number | Time estimate |
| `actualHours` | Number | Actual time spent |

---

## ⚡ Redis Caching Architecture

### Cache Strategy: Cache-Aside (Lazy Loading)

```
┌─────────┐     ┌──────────┐     ┌─────────┐
│ Client  │────▶│   API    │────▶│  Redis  │
└─────────┘     └──────────┘     └─────────┘
                      │                │
                      │                │ Cache Miss
                      ▼                ▼
                 ┌──────────┐     ┌─────────┐
                 │ MongoDB  │◀────│  Cache  │
                 │          │─────│  Store  │
                 └──────────┘     └─────────┘
```

### Cache Hit
When a requested resource exists in Redis, the response is served directly from cache — sub-millisecond latency.

```
Client → API → Redis (key exists) → Return cached JSON → Client
```

### Cache Miss
When the key does not exist, the application queries MongoDB, caches the result, then responds.

```
Client → API → Redis (key missing) → MongoDB query → Store in Redis → Return response → Client
```

### TTL (Time-to-Live)

| Cache Type | TTL | Rationale |
|------------|-----|-----------|
| Single property `property:{id}` | 300s (5 min) | Properties change infrequently |
| Property list `property:list:*` | 120s (2 min) | Lists change with CRUD operations |
| Search results `property:search:*` | 60s (1 min) | Search relevance degrades faster |

### Cache Invalidation

| Operation | Keys Invalidated |
|-----------|-----------------|
| POST | `property:list:*` (all list caches) |
| PUT | `property:{id}` + `property:list:*` |
| DELETE | `property:{id}` + `property:list:*` |

### Graceful Degradation
If Redis is unreachable, the application bypasses cache and queries MongoDB directly. A warning is logged, and caching resumes automatically when Redis reconnects.

---

## 🌐 API Endpoints

### Health
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/health` | Server health check | ❌ |

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register` | Register new user | ❌ |
| POST | `/api/v1/auth/login` | Login user | ❌ |
| POST | `/api/v1/auth/logout` | Logout user | ✅ |
| POST | `/api/v1/auth/refresh` | Refresh access token | ❌ |
| POST | `/api/v1/auth/forgot-password` | Send password reset email | ❌ |
| POST | `/api/v1/auth/reset-password/:token` | Reset password | ❌ |

### Profile
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/profile` | Get current user profile | ✅ |
| PUT | `/api/v1/profile` | Update profile | ✅ |
| PUT | `/api/v1/profile/password` | Change password | ✅ |
| POST | `/api/v1/profile/avatar` | Upload avatar | ✅ |

### Organizations
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/organizations` | Create organization | ✅ |
| GET | `/api/v1/organizations` | List user organizations | ✅ |
| GET | `/api/v1/organizations/:id` | Get organization details | ✅ |
| PUT | `/api/v1/organizations/:id` | Update organization | ✅ |
| DELETE | `/api/v1/organizations/:id` | Delete organization | ✅ |

### Projects
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/projects` | Create project | ✅ |
| GET | `/api/v1/projects` | List projects | ✅ |
| GET | `/api/v1/projects/:id` | Get project details | ✅ |
| PUT | `/api/v1/projects/:id` | Update project | ✅ |
| DELETE | `/api/v1/projects/:id` | Archive project | ✅ |

### Tasks
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/tasks` | Create task | ✅ |
| GET | `/api/v1/tasks` | List tasks (with filters) | ✅ |
| GET | `/api/v1/tasks/:id` | Get task details | ✅ |
| PUT | `/api/v1/tasks/:id` | Update task | ✅ |
| DELETE | `/api/v1/tasks/:id` | Delete task | ✅ |
| PUT | `/api/v1/tasks/:id/order` | Update task order (Kanban) | ✅ |

### Comments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/comments` | Create comment | ✅ |
| GET | `/api/v1/comments/task/:taskId` | Get task comments | ✅ |
| PUT | `/api/v1/comments/:id` | Update comment | ✅ |
| DELETE | `/api/v1/comments/:id` | Delete comment | ✅ |

### Notifications
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/notifications` | List user notifications | ✅ |
| PUT | `/api/v1/notifications/:id/read` | Mark as read | ✅ |
| PUT | `/api/v1/notifications/read-all` | Mark all as read | ✅ |

### Activity
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/activity` | List activity logs | ✅ |

### Dashboard
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/dashboard/stats` | Get dashboard statistics | ✅ |

### Invitations
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/invitations` | Send invitation | ✅ |
| GET | `/api/v1/invitations` | List invitations | ✅ |
| PUT | `/api/v1/invitations/:id/accept` | Accept invitation | ✅ |
| PUT | `/api/v1/invitations/:id/decline` | Decline invitation | ✅ |

---

## 📦 Installation Guide

### Prerequisites
- **Node.js** v18+ (LTS recommended)
- **MongoDB** v6+ (local or Atlas)
- **Redis** v7+ (local or cloud — optional, app works without it)
- **npm** or **yarn**

### Clone Repository

```bash
git clone https://github.com/MaTrix-Mahesh/ProDesk-IT.git
cd prodesk-capstone-taskmatrix
```

### Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Return to root
cd ..
```

### Environment Variables

Copy the example environment file and configure your variables:

```bash
cp server/.env.example server/.env
```

#### Sample `.env` Configuration

```env
# Application
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# MongoDB
MONGO_URI=mongodb://127.0.0.1:27017/taskmatrix

# JWT Authentication
JWT_ACCESS_SECRET=your_super_secret_access_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Redis Cache
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_TTL=300

# Cloudinary (Media Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=noreply@taskmatrix.com
```

### Run Project

#### Start Backend Server

```bash
cd server
npm run dev    # Development (with nodemon)
# OR
npm start      # Production
```

The server starts at **http://localhost:5000**.

#### Start Frontend Client

```bash
cd client
npm run dev    # Vite dev server
```

The client starts at **http://localhost:5173**.

#### Start Redis (if using caching)

```bash
# Windows (with Redis installed)
redis-server

# Linux / macOS
sudo service redis-server start
# OR
redis-server
```

#### Verify Everything is Running

```bash
# Health check
curl http://localhost:5000/api/v1/health

# Should return:
# { "success": true, "message": "Server Healthy" }
```

---

## 🔒 Security

### JWT Authentication
- **Access tokens** (15 min expiry) — short-lived, stored in memory on client
- **Refresh tokens** (7 day expiry) — stored in HTTP-only cookies
- Token rotation on refresh for enhanced security
- Role-based authorization middleware (`protect`, `authorize`, `adminOnly`, `managerOnly`)

### Input Validation
- **express-validator** — validates request body, params, and query strings
- **Zod** — schema-based validation for complex payloads
- Validation occurs **before** controller logic — invalid requests are rejected with `400`

### XSS Protection
- **Helmet.js** — sets secure HTTP headers (`Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`)
- React's JSX auto-escapes values — no raw HTML rendering
- Input sanitization prevents script injection

### Environment Variables
- All secrets stored in `.env` (never committed to version control)
- `.env.example` provides documentation for required variables
- `NODE_ENV` controls error detail exposure (stack traces hidden in production)

### Rate Limiting
- **express-rate-limit** applied to all endpoints
- Public endpoints: 100 requests/min per IP
- Authenticated endpoints: 1000 requests/min per user

### Additional Security Measures
- Password hashing with bcrypt (12 salt rounds)
- MongoDB injection prevention
- CORS with whitelisted origins
- Cookie security (HTTP-only, Secure, SameSite)
- Account deactivation support

---

## ♿ Accessibility

- Semantic HTML with ARIA landmarks (`<main>`, `<nav>`, `<section>`, `<article>`)
- Keyboard navigation with visible focus indicators (WCAG 2.2 compliant)
- Screen reader support with `aria-live` regions for dynamic content
- Proper form labels with `htmlFor` and `aria-describedby` for error linking
- Focus management on modals, forms, and page transitions
- Loading skeletons with `aria-busy="true"` during async operations
- Color contrast compliant with WCAG AA standards

---

## 🚀 Future Improvements

- [ ] **Unit & Integration Tests** — Add Jest test suites for services, controllers, and middleware
- [ ] **CI/CD Pipeline** — GitHub Actions for automated testing and deployment
- [ ] **Docker Support** — Docker Compose for one-command local development
- [ ] **Pagination & Filtering** — Enhanced query parameters for all list endpoints
- [ ] **File Attachments** — Drag-and-drop file uploads on tasks
- [ ] **Email Notifications** — Send email alerts for task assignments and mentions
- [ ] **Dark Mode** — Theme toggle with persisted preference
- [ ] **Mobile Responsiveness** — Optimize Kanban board and calendar for mobile
- [ ] **Search** — Full-text search across tasks, projects, and comments
- [ ] **WebSocket Rooms** — Scoped real-time updates per project/organization
- [ ] **Audit Logs** — Detailed audit trail with before/after snapshots
- [ ] **Export** — Export projects and tasks to CSV/PDF
- [ ] **OAuth** — Social login (Google, GitHub)
- [ ] **Two-Factor Authentication** — TOTP-based 2FA

---

## 📸 Screenshots

> *Screenshots coming soon. Replace this section with actual screenshots of:*
> - Dashboard view
> - Kanban board
> - Project detail page
> - Task creation form
> - Organization settings
> - Calendar view

---

## 👥 Contributors

- **Mahesh** — *Full Stack Developer* — [@MaTrix-Mahesh](https://github.com/MaTrix-Mahesh)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Mahesh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🚀 Git Commands

### Initialize Repository (if not already done)

```bash
git init
```

### Stage All Files

```bash
git add .
```

### Commit Changes

```bash
git commit -m "feat: initial commit - TaskMatrix project management platform

- Full MERN stack with React 19, Express 5, MongoDB, Node.js
- JWT authentication with access/refresh token rotation
- Organization, project, and task management with Kanban board
- Real-time collaboration via Socket.IO
- Redis caching architecture (Sprint 13)
- Role-based access control (admin, manager, member)
- Cloudinary media storage integration
- Comprehensive API with 30+ RESTful endpoints
- Professional .gitignore, .env.example, and README documentation"
```

### Add Remote Origin

```bash
git remote add origin https://github.com/MaTrix-Mahesh/ProDesk-IT.git
```

### Push to GitHub

```bash
git push -u origin main
# OR if your default branch is master
git push -u origin master
```

### Subsequent Pushes

```bash
git add .
git commit -m "type: concise description of changes"
git push
```

### Commit Message Convention

| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `refactor` | Code refactoring |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `chore` | Build process, dependencies, etc. |
| `style` | Formatting, missing semicolons, etc. |

---

<div align="center">
  <p>Built with ❤️ by <strong>Mahesh</strong> — ProDesk IT Capstone Project</p>
  <p>
    <a href="https://github.com/MaTrix-Mahesh/ProDesk-IT">GitHub Repository</a> •
    <a href="#-project-description">About</a> •
    <a href="#-installation-guide">Getting Started</a> •
    <a href="#-api-endpoints">API Docs</a>
  </p>
</div>