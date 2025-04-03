const User = require('../models/User');
const bcrypt = require('bcrypt');

// Registro
exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: 'El email ya está registrado.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ nombre, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Usuario no encontrado.' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: 'Contraseña incorrecta.' });

    res.json({ message: 'Login exitoso.', email: user.email, nombre: user.nombre });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Obtener perfil por email
exports.getProfile = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'Usuario no encontrado.' });

    res.json({ nombre: user.nombre, email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Actualizar nombre del perfil
exports.updateProfile = async (req, res) => {
  const { email, nombre } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { nombre },
      { new: true }
    );

    if (!user)
      return res.status(404).json({ message: 'Usuario no encontrado.' });

    res.json({ message: 'Nombre actualizado exitosamente.', nombre: user.nombre });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
