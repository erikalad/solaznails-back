const express = require('express');
const { Clienta } = require('./../../db');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    // Obtener todos los usuarios desde la base de datos
    const clientas = await Clienta.findAll();
    // Enviar respuesta con la lista de usuarios
    res.status(200).json(clientas);
  } catch (error) {
    // Manejar errores y enviar respuesta al cliente
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
  }
});

module.exports = router;