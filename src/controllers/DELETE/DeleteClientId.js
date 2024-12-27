const express = require('express');
const { Clienta } = require('./../../db'); // Asegúrate de que los modelos están correctamente importados

const router = express.Router();

// Ruta para eliminar una clienta por id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtener el id de los parámetros de la URL

    // Buscar la clienta para verificar si existe
    const clienta = await Clienta.findByPk(id);

    if (!clienta) {
      return res.status(404).json({ mensaje: 'Clienta no encontrada' });
    }

    // Eliminar la clienta (esto también eliminará las relaciones si tienes CASCADE configurado)
    await clienta.destroy();

    // Responder al cliente con un mensaje de éxito
    res.status(200).json({ mensaje: 'Clienta eliminada exitosamente' });
  } catch (error) {
    // Manejar errores y enviar respuesta al cliente
    console.error('Error al eliminar clienta:', error);
    res.status(500).json({ mensaje: 'Error al eliminar clienta', error: error.message });
  }
});

module.exports = router;
