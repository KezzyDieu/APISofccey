const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');

// Configuración de multer para recibir archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ruta para enviar correo con imagen adjunta
router.post('/enviar', upload.single('imagen'), async (req, res) => {
  try {
    const { email } = req.body;
    const archivo = req.file;

    if (!email || !archivo) {
      return res.status(400).json({ success: false, message: 'Faltan datos necesarios' });
    }

    // Configura tu transporte de correo (usa tu cuenta de Gmail o servicio SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: 'SOFCEY <TU_CORREO@gmail.com>',
      to: email,
      subject: 'Resultados del Quiz - SOFCEY',
      text: `Hola ${email}, te compartimos tu resultado del quiz.`,
      attachments: [
        {
          filename: 'resultado.png',
          content: archivo.buffer,
          contentType: archivo.mimetype
        }
      ]
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error al enviar el correo' });
  }
});

module.exports = router;
