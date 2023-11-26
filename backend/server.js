const express = require('express');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', require('./routes/userRoutes'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
    connectDB();
});


// POST - /api/users** — Register a user
// POST - /api/users/auth** Authenticate a user and get token
// POST - /api/users/logout** — Logout user and clear cookie
// GET  - /api/users/profile** - Get user profile
// PUT  - /api/users/profile** — Update profile