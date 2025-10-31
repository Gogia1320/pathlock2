## Mini Project Manager 
A full-stack project management system built with ASP.NET Core (C#) for the backend and React + TypeScript + TailwindCSS (Vite) for the frontend.
This app enables users to register, login, create projects, manage tasks, and track progress — all secured via JWT authentication.

## Folder Structure Overview
                 ```
                ├── ProjectManagerAPI/                 # Backend (.NET 8)
                │   ├── Controllers/                   # API Endpoints (Auth, Projects, Tasks)
                │   ├── DTOs/                          # Data Transfer Objects for API requests/responses
                │   ├── Data/                          # In-memory datastore and interfaces
                │   ├── Models/                        # Core domain models (User, Project, TaskItem)
                │   ├── Services/                      # Business logic and service layer
                │   ├── Program.cs                     # Main entry point for backend
                │   ├── appsettings.json               # App configuration
                │   └── ProjectManagerAPI.csproj       # Project file
                │
                └── project-manager-frontend/          # Frontend (React + TypeScript + Vite)
                    ├── src/
                    │   ├── api/                       # Axios instance setup
                    │   ├── components/                # UI components (ProjectCard, TaskForm, etc.)
                    │   ├── pages/                     # Application pages (Dashboard, Login, etc.)
                    │   ├── utils/                     # Helper functions (auth utilities)
                    │   ├── types/                     # TypeScript interfaces/types
                    │   ├── App.tsx                    # Root component
                    │   ├── main.tsx                   # Entry point
                    │   └── index.css / App.css        # Styling
                    ├── vite.config.ts                 # Vite configuration
                    ├── tailwind.config.js             # TailwindCSS setup
                    └── package.json                   # Frontend dependencies and scripts
  
## Features
1. Authentication
   * User registration and login
   * Secure JWT-based authorization
   * Protected routes (frontend & backend)

2. Projects
   * Create, view, and delete projects
   * Fetch project details with related tasks
     
3. Tasks
   * Create and manage tasks under projects
   * Update task progress and due dates
   * Task dependencies supported

4. Architecture
   * Backend: Clean architecture using Controllers → Services → Data layer
   * Frontend: Modular React components with state management and routing
   * API Communication: Axios with centralized instance for token management

## Technologies Used
1. Backend (C# / .NET 8)
   * ASP.NET Core Web API
   * Dependency Injection
   * JWT Authentication
   * Swagger for API documentation

2. Frontend (React + TypeScript)
   * React 18 + Vite
   * TailwindCSS for styling
   * React Router DOM for routing
   * Axios for API calls
  
## Setup and Installation

Prerequisites

* Ensure the following are installed:
* .NET 8 SDK
* Node.js (v18+)
* npm
* (Optional) Postman
 for API testing

## Backend Setup
         ```
      # Navigate to backend
      cd ProjectManagerAPI
      
      # Restore dependencies
      dotnet restore
      
      # Build the project
      dotnet build
      
      # Run the API
      dotnet run


* Backend runs by default on:
https://localhost:5142
* You can test APIs using Swagger UI at:
https://localhost:5142/swagger

## Frontend Setup
          ```
          # Navigate to frontend
          cd project-manager-frontend
          
          # Install dependencies
          npm install
          
          # Start development server
          npm run dev

Frontend runs by default on: http://localhost:5173

## Connecting Frontend and Backend
* Open project-manager-frontend/.env
* Add your backend API base URL:
VITE_API_BASE_URL=http://localhost:5298/api/v1
* Ensure the frontend’s Axios instance (src/api/axiosInstance.ts) uses this environment variable.

## Authentication Flow
* User registers via /register
* Logs in via /login → Receives JWT token
* Token stored in localStorage
* Protected routes (Dashboard, Projects) check token before access
* Axios automatically attaches token to API requests


## API Endpoints Summary
| Method | Endpoint                             | Description                |
| ------ | ------------------------------------ | -------------------------- |
| POST   | `/api/v1/auth/register`              | Register a new user        |
| POST   | `/api/v1/auth/login`                 | Login user & get JWT       |
| GET    | `/api/v1/projects`                   | Get all projects           |
| POST   | `/api/v1/projects`                   | Create a new project       |
| GET    | `/api/v1/projects/{id}`              | Get project details        |
| DELETE | `/api/v1/projects/{id}`              | Delete a project           |
| POST   | `/api/v1/projects/{projectId}/tasks` | Add task to a project      |
| GET    | `/api/v1/projects/{projectId}/tasks` | Get all tasks in a project |

## Frontend Pages
| Page                   | Path            | Description                 |
| ---------------------- | --------------- | --------------------------- |
| **LoginPage**          | `/login`        | User login page             |
| **RegisterPage**       | `/register`     | New user registration       |
| **DashboardPage**      | `/dashboard`    | Lists user’s projects       |
| **ProjectDetailsPage** | `/projects/:id` | Shows project and its tasks |

## Services Overview
| Service            | Purpose                                              |
| ------------------ | ---------------------------------------------------- |
| **AuthService**    | Handles user registration, login, and JWT generation |
| **ProjectService** | Manages CRUD operations for projects                 |
| **TaskService**    | Handles task creation, updates, and deletion         |

## Frontend Components
| Component          | Purpose                               |
| ------------------ | ------------------------------------- |
| **ProjectCard**    | Displays project summary              |
| **TaskCard**       | Displays task details                 |
| **ProjectForm**    | Form to create a new project          |
| **TaskForm**       | Form to create a new task             |
| **ProtectedRoute** | Guards routes for authenticated users |

## Configuration Files
| File                   | Description                           |
| ---------------------- | ------------------------------------- |
| **appsettings.json**   | Stores backend config (JWT key, etc.) |
| **tailwind.config.js** | TailwindCSS theme setup               |
| **vite.config.ts**     | Vite dev server config                |
| **axiosInstance.ts**   | Axios setup with interceptors         |

## Example Test Flow
* Run backend (dotnet run)
* Run frontend (npm run dev)
* Open browser → http://localhost:5173
* Register → Login → Create project → Add tasks
* View and manage tasks in project details page
 
