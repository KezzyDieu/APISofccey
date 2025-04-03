// models/SensorData.js
const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  palabra_reconocida: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', sensorDataSchema, 'sensor_data');
