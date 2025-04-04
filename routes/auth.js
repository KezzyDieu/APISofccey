//routes/auth.js
const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', getProfile);       // ✅ Nuevo: obtener perfil
router.put('/profile', updateProfile);    // ✅ Nuevo: actualizar nombre

module.exports = router;
