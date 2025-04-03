require('dotenv').config();
const mongoose = require('mongoose');

// ✅ Conexión correcta (sin agregar /iot_data aquí)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB (iot_data)"))
  .catch((err) => console.error("❌ Error en la conexión", err));

// ✅ Modelo con letra y timestamp
const LetraModel = mongoose.model('SensorData', new mongoose.Schema({
  palabra_reconocida: String,
  timestamp: { type: Date, default: Date.now }
}), 'sensor_data'); // nombre de la colección

// ✅ Insertar letra aleatoria
async function insertarLetraAleatoria() {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letra = letras[Math.floor(Math.random() * letras.length)];

  const doc = new LetraModel({ palabra_reconocida: letra });
  await doc.save();
  console.log("🆕 Letra insertada:", letra);
  mongoose.disconnect();
}

insertarLetraAleatoria();
