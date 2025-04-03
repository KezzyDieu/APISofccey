// routes/quiz.js
const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');

// Ruta para obtener la última letra registrada
router.get('/ultima-letra', async (req, res) => {
  try {
    const ultima = await SensorData.findOne().sort({ timestamp: -1 });

    if (!ultima || !ultima.palabra_reconocida) {
      return res.status(404).json({ message: 'No hay datos disponibles.' });
    }

    res.json({
      letra: ultima.palabra_reconocida,
      timestamp: ultima.timestamp,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor', error: err.message });
  }
});

module.exports = router;
