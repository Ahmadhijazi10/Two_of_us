const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();  // Load environment variables from .env file
const cors = require('cors');
const morgan = require('morgan');

const port = process.env.APP_PORT;  // Port for the backend server

const app = express();

// Middleware for parsing JSON data (for API requests)
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // 'dev' is one of the predefined log formats

// Import user routes
const userRoute = require('./Routes/userRoute');  // Make sure this path is correct
const applicationRoute =require('./Routes/applicationRoute');
const newsRoute=require('./Routes/newsRoute');
const courseRoute = require('./Routes/courseRoute');

// Use the user route for API endpoints (routes like GET /api/users, POST /api/users)
app.use('/api/users', userRoute);
app.use('/api/application', applicationRoute);
app.use('/api/news', newsRoute);
app.use('/api/courses',courseRoute);

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://zaatariamer12:FGTcRPPA19WS7CTV@cluster0.9cg3d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

connectDB();

// // Test route to check if the server is working
// app.get("/", (req, res) => {
//   res.send("hello");  // Simple response to test server
// });

// Start the backend server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);  // Log to console when the server is running
});
