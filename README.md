# Employee Management System

A full-stack web application for managing employees, departments, leave requests, and salaries with role-based access control (Admin and Employee roles).

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for database
- **JWT** for authentication
- **Cloudinary** for image uploads
- **Multer** for file handling

### Frontend
- **React 19** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Data Table Component** for data display

## Project Structure

```
Employee Management System/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middlewares/     # Authentication & error handling
│   │   ├── utils/           # Helper functions
│   │   ├── seeders/         # Database seeders
│   │   ├── app.js           # Express app setup
│   │   └── index.js         # Server entry point
│   ├── public/              # Static files
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Context API
│   │   ├── utils/           # Helper functions
│   │   ├── api/             # API configuration
│   │   └── App.jsx          # Main app component
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json          # Vercel deployment config
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB connection string

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
PORT=9000
CORS_ORIGIN_DEV=http://localhost:5173
CORS_ORIGIN_PROD=your-frontend-url //deployed one
NODE_ENV=development
MONGO_URI=your-mongodb-connection-string
ENCRYPTION_ROUND=your encription round
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASS=admin123
ACCESS_TOKEN_SECRET=your-secret-key
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-secret-key
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
DEFAULT_AVATAR=your-default-avatar-url
```

4. Start the server:
```bash
npm run dev      # Development mode with nodemon
npm start        # Production mode
npm run build    # Build the application
```

The backend will run on `http://localhost:9000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```
VITE_BASE_URL=http://localhost:9000 || your_backend_url
```

4. Start the development server:
```bash
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### User (Authentication)
- `POST /api/v1/users/login` - Login user
- `POST /api/v1/users/logout` - Logout user (Auth required)

### Employees (Auth Required)
- `GET /api/v1/employees` - Get all employees (Admin only)
- `GET /api/v1/employees/:_id` - Get employee by ID
- `POST /api/v1/employees/add` - Create new employee (Admin only, with avatar upload)
- `PUT /api/v1/employees/:_id` - Update employee (Admin only)
- `GET /api/v1/employees/departments/:_id` - Get employees by department (Admin only)

### Departments (Auth Required, Admin Only)
- `GET /api/v1/departments` - Get all departments
- `GET /api/v1/departments/:_id` - Get department details
- `POST /api/v1/departments/add` - Create new department
- `PUT /api/v1/departments/:_id` - Update department
- `DELETE /api/v1/departments/:_id` - Delete department

### Leave Management (Auth Required)
- `GET /api/v1/leaves` - Get all leave requests
- `GET /api/v1/leaves/:_id` - Get leave request by ID
- `POST /api/v1/leaves/add` - Create leave request
- `GET /api/v1/leaves/details/:_id` - Get leave request details
- `PUT /api/v1/leaves/:_id` - Update leave request (Admin only)

### Salary (Auth Required)
- `GET /api/v1/salary/:_id` - Get salary information by employee ID
- `POST /api/v1/salary/add` - Create salary record (Admin only)

### Dashboard (Auth Required, Admin Only)
- `GET /api/v1/dashboard/summary` - Get dashboard statistics and summary

### Settings
- Routes available at `/api/v1/settings`

## Features

- **User Authentication**: Secure login with JWT tokens
- **Role-Based Access Control**: Different features for Admin and Employees
- **Employee Management**: Add, edit, delete, and view employee details
- **Department Management**: Manage company departments
- **Leave Management**: Request and approve/reject leave
- **Salary Management**: Manage employee salaries
- **Dashboard**: View statistics and summaries
- **Image Upload**: Upload employee avatars via Cloudinary
- **Data Export**: Export employee and salary data

## Deployment

### Frontend Deployment (Vercel)
The project includes a `vercel.json` configuration file for easy deployment to Vercel.

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect the Vite build configuration
4. Set environment variables in Vercel dashboard

### Backend Deployment
Deploy the backend to services like:
- Render
- Heroku
- AWS
- Railway

## Default Admin Credentials

Email: `admin@gmail.com`
Password: `admin123`



## Error Handling

The application includes comprehensive error handling:
- API error responses with proper status codes
- Middleware for error catching
- Client-side error messages
- Validation error handling

## Security Features

- JWT-based authentication
- Password encryption with bcrypt
- CORS protection
- Admin middleware for protected routes
- Secure cookie handling

## Author

Krrish Kumar

---

For any issues or questions, please create an issue in the repository.
