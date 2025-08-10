require('dotenv').config();
const orders = require('./routes/orders');
const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const { initializeFirebaseApp } = require('./controllers/firebase');

const app = express();

// Middleware
app.use(express.json());
app.use(fileUpload());
app.use(cors({
  origin: 'https://react-project-f7563.web.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Firebase initialization
try {
  initializeFirebaseApp();
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  process.exit(1);
}

// API routes
app.use('/api/v1/orders', orders);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Health check route
app.get('/', (req, res) => {
  res.send('API Server is running');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});