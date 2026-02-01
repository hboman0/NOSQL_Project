# Taste-Mart Restaurant Management System

## Project Overview

Full-stack web application for restaurant management including menu display, table reservations, and order management. Built with MongoDB, Express.js, and vanilla JavaScript.

**Course:** Advanced Databases (NoSQL)  
**Team Size:** 1 student

## Technology Stack

**Backend:**
- Node.js with Express.js
- MongoDB (NoSQL database)
- Mongoose ODM
- JWT authentication
- bcryptjs for password hashing

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5
- jQuery
- Fetch API

## Features

- Menu management with CRUD operations
- Table reservation system
- Pre-order menu items with reservations
- JWT-based authentication and authorization
- Dark mode theme
- Responsive design
- Advanced MongoDB operations (aggregations, compound indexes)

## Installation

### Prerequisites
- Node.js v14+
- MongoDB v4.4+
- npm v6+

### Setup

1. Clone repository
```bash
git clone https://github.com/yourusername/restaurant-management.git
cd restaurant-management
```

2. Install dependencies
```bash
cd backend
npm install
```

3. Configure environment (.env file in backend directory)
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/restaurant_db
JWT_SECRET=super_secret_key_123
```

4. Start MongoDB
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb

# Windows
net start MongoDB
```

5. Create admin user in MongoDB
```javascript
db.users.insertOne({
  email: "admin@taste-mart.com",
  password: "$2a$10$...", // Use bcrypt to hash password
  role: "admin"
})
```

6. Start backend server
```bash
npm start
```

7. Open frontend
Open `frontend/index.html` in browser or serve with:
```bash
python -m http.server 8000
```

## Project Structure

```
project/
├── backend/
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth and role checking
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   ├── .env               # Environment variables
│   ├── server.js          # Express app
│   └── package.json
└── frontend/
    ├── css/
    ├── js/
    ├── images/
    └── *.html             # 5 pages
```

## API Endpoints

Base URL: `http://localhost:3000/api`

### Authentication
- POST `/auth/register` - Register user
- POST `/auth/login` - Login and get JWT token

### Menu (6 endpoints)
- GET `/menu` - Get all menu items
- GET `/menu/:id` - Get menu item by ID
- POST `/menu` - Create menu item (admin)
- PUT `/menu/:id` - Update menu item (admin)
- DELETE `/menu/:id` - Delete menu item (admin)
- PUT `/menu/:id/views` - Increment views

### Reservations (10 endpoints)
- GET `/reservations` - Get all reservations
- GET `/reservations/:id` - Get reservation by ID
- POST `/reservations` - Create reservation (admin)
- PUT `/reservations/:id` - Update reservation (admin)
- DELETE `/reservations/:id` - Delete reservation (admin)
- POST `/reservations/:id/items` - Add item to reservation (admin)
- DELETE `/reservations/:id/items` - Remove item from reservation (admin)
- PUT `/reservations/bulk/large` - Mark large reservations (admin)
- GET `/reservations/stats/summary` - Get statistics (admin)

Total: 18 endpoints

## Database Schema

### Collections

**Users**
```javascript
{
  email: String (unique),
  password: String (hashed),
  role: String (enum: ["user", "admin"])
}
```

**MenuItems**
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String (enum: ["starters", "main", "desserts"]),
  image: String,
  views: Number
}
```

**Reservations**
```javascript
{
  customerName: String,
  guests: Number,
  date: String,
  time: String,
  specialRequests: String,
  orderedItems: [
    {
      menuItem: ObjectId (ref: "MenuItem"),
      quantity: Number
    }
  ]
}
// Index: { date: 1, time: 1 }
```

## MongoDB Features Implemented

- Full CRUD operations
- Embedded documents (orderedItems)
- Referenced documents (menuItem)
- Advanced operators: $inc, $push, $pull, $set, updateMany
- Aggregation pipeline (group + sort)
- Compound index on {date, time}

## Security

- JWT authentication
- Password hashing with bcrypt
- Role-based authorization (admin/user)
- Protected routes with middleware
- Environment variables for sensitive data

## Requirements Met

- 18 REST API endpoints (requirement: 8+)
- 5 frontend pages (requirement: 4+)
- Full CRUD across collections
- Embedded and referenced models
- Advanced update/delete operators
- Multi-stage aggregation
- Compound indexes
- Authentication and authorization
- Complete documentation

