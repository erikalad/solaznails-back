const express = require('express');
const path = require('path');
const { Turno } =  require('./../../db');
const router = express.Router();

// Ruta para servir los archivos estáticos desde la carpeta 'uploads'
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta para obtener todas las fotos de todos los turnos
router.get('/', async (req, res) => {
  try {
    // Obtener todos los turnos de la base de datos
    const turnos = await Turno.findAll({
      attributes: ['imagenAntes', 'imagenDespues']  // Seleccionamos solo las columnas con las fotos
    });

    if (!turnos || turnos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron fotos de turnos.' });
    }

    // Generar las URLs de las imágenes para cada turno
    const fotos = turnos.map(turno => ({
      imagenAntes: turno.imagenAntes ? `/uploads/${turno.imagenAntes}` : null,
      imagenDespues: turno.imagenDespues ? `/uploads/${turno.imagenDespues}` : null
    }));

    // Devolver las URLs de las fotos
    res.json(fotos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las fotos de los turnos.' });
  }
});

module.exports = router;
