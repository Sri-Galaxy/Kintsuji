# 🍵 Kintsuji

## 📌 Overview

Kintsuji is a web application inspired by the Japanese art of Kintsugi - embracing imperfections and making them beautiful. This project is a listing platform built with Express.js and MongoDB, featuring user authentication, authorization, listing management, and review systems.

[View Live Demo](https://kintsuji.onrender.com/listings)

---

## ✨ Features

- **User Authentication & Authorization**:
  - Secure login and registration system using Passport.js
  - User-specific access controls for listings and reviews
  - Protected routes for authenticated users
  - Role-based permissions for listing management
- **Listing Management**: 
  - Create, read, update, and delete listings
  - Owner-only edit and delete capabilities
  - Image upload and management
- **Review System**: 
  - User-authenticated review posting
  - Review management with user authorization
- **Interactive UI Components**:
  - Flash messages for user feedback
  - Responsive navigation with navbar
  - Consistent layout with EJS templates
  - Mobile-friendly interface design
- **Security Features**:
  - Session management with MongoDB store
  - Custom error handling middleware
  - Input validation
  - Protected API endpoints

---

## 🛠️ Technologies Used

### Core Technologies
- Node.js (v22.11.0)
- Express.js (v4.21.2)
- MongoDB with Mongoose (v8.11.0)
- EJS with EJS-Mate for templating

### Authentication & Session Management
- Passport.js with Local Strategy
- Express-session with MongoDB store
- Connect-flash for flash messages

### File Upload & Storage
- Multer for file handling
- Cloudinary for image storage

### Validation & Security
- Joi for data validation
- Method-override for HTTP methods
- Custom error handling middleware

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v22.11.0 or compatible version)
- npm (comes with Node.js)
- MongoDB (local installation or Atlas account)
- Git

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Sri-Galaxy/kintsuji.git
cd kintsuji
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
ATLAS_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Application
```bash
node app.js
```

The application will be available at:
- `http://localhost:8088`

### 5. Available Routes

#### Authentication Routes
- `/login` - User login page
- `/signup` - New user registration
- `/logout` - User logout

#### Listing Routes (Protected)
- `/listings` - View all listings (Public)
- `/listings/new` - Create new listing (Auth required)
- `/listings/:id` - View specific listing (Public)
- `/listings/:id/edit` - Edit listing (Owner only)
- `/listings/:id/delete` - Delete listing (Owner only)

#### Review Routes (Protected)
- `/listings/:id/reviews` - View listing reviews (Public)
- `/listings/:id/reviews/new` - Add review (Auth required)
- `/listings/:id/reviews/:rid/delete` - Delete review (Owner only)

All protected routes require authentication, and some routes (like edit and delete) require authorization checking if the logged-in user is the owner of the resource.

---

## 📁 Project Structure
```
kintsuji/
├── controllers/           # Route controllers
│   ├── listing_control.js  
│   ├── review_control.js   
│   └── user_control.js     
├── models/               # MongoDB models
│   ├── schema.js         
│   ├── review.js          
│   └── user.js          
├── public/
│   ├── css/
│       └── style.css
│   ├── js/
        └── script.js
│   └── logo.png
├── routes/               # Express routes
│   ├── listing_routes.js  
│   ├── review_routes.js  
│   └── user_routes.js
├── views/                # EJS templates
│   ├── layouts/          # Base templates
│   │   └── default.ejs 
│   ├── includes/         # Reusable components
│   │   ├── navbar.ejs
│   │   ├── flash.ejs
│   │   └── footer.ejs 
│   ├── listings/         # Listing views
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── new.ejs 
│   │   ├── edit.ejs 
│   │   └── error.ejs
│   └── users/            # User views
│       ├── log-in.ejs 
│       └── sign-up.ejs
├── utils/               # Utility functions
    ├── customError.js
    └──wrapAsync.js
├── app.js              # Main application file
├── cloudConfig.js
├── middleware.js
├── package-lock.json
├── validator.js
├── .env
└── package.json       # Project dependencies
```

---

## 🌐 Deployment

The application is deployed on Render:
- Web Service: Node.js application
- Database: MongoDB Atlas

### Deployment Steps
1. Create a Render account and connect your GitHub repository
2. Configure environment variables in Render dashboard:
   - `ATLAS_URL`
   - `SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_KEY`
   - `CLOUDINARY_SECRET`
3. Set Node.js version to 22.11.0 in `engines` field of package.json
4. Deploy the application

Live Demo: [https://kintsuji.onrender.com/listings](https://kintsuji.onrender.com/listings)

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request


## � Acknowledgments

This project embraces the philosophy of Kintsugi, demonstrating that imperfections can lead to something more beautiful. Special thanks to:
- The Node.js and Express.js communities
- MongoDB Atlas for database hosting
- Cloudinary for image management
- Render for application hosting

---

*Made with ❤️ by Srinath*

---
