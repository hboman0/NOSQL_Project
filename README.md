# Taste-Mart | Restaurant Management System

## Project Description
Taste-Mart is a full-stack restaurant management system that allows users to view the menu and make table reservations. The backend is built with **Node.js**, **Express**, and **MongoDB**, while the frontend is a responsive **HTML/CSS/JS** interface. Users can view menu items with images, filter dishes by category, and book reservations online.

---

## Features
- Display menu items with images, descriptions, prices, and categories.
- Filter menu items by category (Starters, Main Courses, Desserts).
- Make table reservations by filling out a form (CRUD operations on reservations).
- Responsive design with dark/light theme toggle.
- Data persistence using MongoDB.

---

## Installation

1. Clone this repository:
git clone https://github.com/yourusername/taste-mart.git
cd taste-mart

2. Install dependencies:
npm install

3. Create a .env file in the root folder:
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/restaurant_db

4. Start the server
node server.js

5. Open index.html or run a live server for frontend testing

## Project structure
Taste-Mart/
│
├─ server.js            # Main backend server
├─ package.json         # Node.js dependencies
├─ .env                 # Environment variables (not tracked in git)
├─ routes/              # Express routes
│  ├─ menu.routes.js
│  └─ reservation.routes.js
├─ controllers/         # Route controllers for CRUD operations
│  ├─ menu.controller.js
│  └─ reservation.controller.js
├─ models/              # Mongoose schemas
│  ├─ menu.model.js
│  └─ reservation.model.js
├─ public/              # Static frontend assets
│  ├─ images/           # Menu item images
│  ├─ css/
│  └─ js/
└─ README.md

## API Routes
Menu
Method	Endpoint	Description
GET	/api/menu	Get all menu items
POST	/api/menu	Add a new menu item (admin)

Reservations
Method	Endpoint	Description
GET	/api/reservations	Get all reservations
POST	/api/reservations	Create a new reservation
PUT	/api/reservations/:id	Update reservation by ID
DELETE	/api/reservations/:id	Delete reservation by ID

## Screenshots
<img width="1909" height="929" alt="Снимок экрана 2026-01-18 004631" src="https://github.com/user-attachments/assets/7045a8e5-f185-4274-90c6-afcf5ac6f61d" />
<img width="1919" height="429" alt="Снимок экрана 2026-01-18 004637" src="https://github.com/user-attachments/assets/45f994dd-e5f3-4171-8691-777261ef882e" />
<img width="1532" height="919" alt="Снимок экрана 2026-01-18 011154" src="https://github.com/user-attachments/assets/9b66663a-00cc-42e4-ada7-9353127d9452" />
<img width="1456" height="835" alt="Снимок экрана 2026-01-18 011230" src="https://github.com/user-attachments/assets/69b31de0-09bd-479b-91ec-2e4e60d88d15" />




