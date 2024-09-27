const express = require('express');
const app = express();
const adminRoutes = require('./route/index');
require('dotenv').config();
const connectdb = require('./config/db');
const PORT = process.env.PORT || 9000;
const cors = require('cors');

// Connect to the database
connectdb();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/admin', adminRoutes);
app.get('/', (req, res) => {
    res.json({ success: true, message: 'Welcome to the express', status: 200 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
