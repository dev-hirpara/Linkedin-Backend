# Mini LinkedIn - Backend

Node.js backend API for the Mini LinkedIn social networking platform.

## Tech Stack

- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- bcryptjs (Password hashing)
- Security middleware (Helmet, CORS, Rate limiting)

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Environment Setup:
   - Copy `.env.example` to `.env`
   - Update the environment variables:
```env
MONGODB_URI=mongodb://localhost:27017/mini-linkedin
JWT_SECRET=your_jwt_secret_here_change_this_in_production
PORT=3001
```

3. Make sure MongoDB is running:
```bash
# For local MongoDB installation
mongod

# Or use MongoDB Atlas cloud database
# Update MONGODB_URI in .env with your Atlas connection string
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at http://localhost:3001

## Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post (authenticated)
- `GET /api/posts/user/:userId` - Get posts by user

### Users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/profile` - Update user profile (authenticated)

### Health
- `GET /api/health` - Health check endpoint

## Project Structure

```
├── config/
│   └── database.js         # MongoDB connection
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── User.js           # User model
│   └── Post.js           # Post model
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── posts.js         # Post management routes
│   └── users.js         # User management routes
├── server.js            # Express server setup
├── package.json         # Dependencies
└── .env                # Environment variables
```

## Database Schema

### User Model
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  name: String (required),
  bio: String (optional),
  timestamps: true
}
```

### Post Model
```javascript
{
  content: String (required),
  user: ObjectId (ref: 'User', required),
  timestamps: true
}
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes and API endpoints
- Input validation and sanitization
- CORS configuration
- Rate limiting
- Security headers with Helmet
