// routes/admin.js
const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../middlewares/authMiddleware');

router.get('/stats', verifyToken, requireAdmin, (req, res) => {
  // Aquí podrías devolver un iframe de MongoDB Atlas Charts u otros datos.
  res.json({ message: '¡Bienvenido admin! Puedes ver las gráficas.' });
});

module.exports = router;
