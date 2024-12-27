const express = require('express');
const { Clienta, Turno, conn } = require('./../../db');

const router = express.Router();

// Ruta para obtener todas las clientas con el total de turnos
router.get('/', async (req, res) => {
  try {
    // Obtener clientas con la cantidad de turnos
    const clientas = await Clienta.findAll({
      attributes: [
        ['nombre', 'name'], // Seleccionar el nombre y darle un alias
        [conn.fn('COUNT', conn.col('turnos.id_turno')), 'visitas'], // Contar turnos
      ],
      include: [
        {
          model: Turno,
          as: 'turnos',  // Especificar el alias de la relación
          attributes: [], // No incluir atributos de los turnos
        },
      ],
      group: ['clienta.id_clienta'], // Agrupar por el ID de la clienta (usar el alias en minúsculas)
    });

    // Responder con la lista de clientas y sus visitas
    res.status(200).json(clientas);
  } catch (error) {
    console.error('Error al obtener clientas con visitas:', error);
    res.status(500).json({ mensaje: 'Error al obtener clientas con visitas', error: error.message });
  }
});

module.exports = router;
