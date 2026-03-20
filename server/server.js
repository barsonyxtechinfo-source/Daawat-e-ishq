// server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();

/* =========================
   GLOBAL MIDDLEWARE
========================= */
app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://daawat-e-ishq.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

/* =========================
   DATABASE
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

/* =========================
   ROUTES
========================= */
const menuRoutes = require('./routes/menuRoutes');

app.use('/menu', menuRoutes);

/* =========================
   HEALTH CHECK (IMPORTANT)
========================= */
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Daawat-E-Ishq Backend is running'
  });
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
