// server/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

/* =======================
   DATABASE CONNECTION
======================= */
connectDB();

/* =======================
   CORS CONFIGURATION
======================= */
const allowedOrigins = [
  'http://localhost:3000',
 
  'https://daawat-e-ishq.vercel.app',
  
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, curl, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

/* =======================
   BODY PARSER
======================= */
app.use(express.json());

/* =======================
   ROUTES
======================= */
const { userMenuRouter, adminMenuRouter } = require('./routes/menuRoutes');
const { userReservationRouter, adminReservationRouter } = require('./routes/reservationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { userOrderRouter, adminOrderRouter } = require('./routes/orderRoutes');
const adminAuthRoutes = require('./routes/adminAuth');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contactRoutes');
const testRoutes = require('./routes/testRoutes');

/* ---- USER ROUTES ---- */
app.use('/api/menu', userMenuRouter);
app.use('/api/reservations', userReservationRouter);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', userOrderRouter);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/test', testRoutes);

/* ---- ADMIN ROUTES ---- */
app.use('/admin/menu', adminMenuRouter);
app.use('/admin/reservations', adminReservationRouter);
app.use('/admin/orders', adminOrderRouter);
app.use('/admin/auth', adminAuthRoutes);

/* =======================
   GLOBAL ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error('Global error:', err.message);
  res.status(500).json({
    error: err.message || 'Internal Server Error'
  });
});

/* =======================
   404 HANDLER
======================= */
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

module.exports = app;
