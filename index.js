// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz'); // ⬅️ nueva ruta
const emailRoutes = require('./routes/email');
const adminRoutes = require('./routes/admin');


const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/email', emailRoutes);

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
