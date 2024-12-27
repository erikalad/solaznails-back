const express = require('express');
const { Clienta, Comentarios, Salud, Historial, Preferencias, Turno } = require('./../../db'); // Importa los modelos relacionados

const router = express.Router();

// Ruta para obtener una clienta por id junto con sus relaciones
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtener el id de los parámetros de la URL

    // Buscar la clienta con el id proporcionado y sus relaciones
    const clienta = await Clienta.findByPk(id, {
      include: [
        { model: Comentarios, as: 'comentarios' }, // Relación con comentarios
        { model: Salud, as: 'salud' },             // Relación con salud
        { model: Historial, as: 'historial' },     // Relación con historial
        { model: Preferencias, as: 'preferencias' },// Relación con preferencias
        { model: Turno, as: 'turnos' }             // Relación con turnos (corrección de singular a plural)
      ]
    });

    // Verificar si la clienta existe
    if (!clienta) {
      return res.status(404).json({ mensaje: 'Clienta no encontrada' });
    }

    // Enviar respuesta con los datos de la clienta y sus relaciones
    res.status(200).json(clienta);
  } catch (error) {
    // Manejar errores y enviar respuesta al cliente
    console.error('Error al obtener clienta:', error);
    res.status(500).json({ mensaje: 'Error al obtener clienta', error: error.message });
  }
});

module.exports = router;
