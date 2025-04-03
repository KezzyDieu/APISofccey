const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Tu correo
    pass: process.env.EMAIL_PASS  // Contraseña o App Password
  }
});

async function enviarCorreoConImagen(destinatario, archivoPath) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: destinatario,
    subject: 'Resultados de SOFCEY',
    text: 'Te compartimos tu resultado del quiz de lenguaje de señas.',
    attachments: [
      {
        filename: 'resultado.png',
        path: archivoPath
      }
    ]
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { enviarCorreoConImagen };
