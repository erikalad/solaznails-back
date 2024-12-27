const express = require('express');
const { Turno } = require('../../db'); // Asegúrate de importar el modelo Turno
const { Op } = require('sequelize'); // Importar operadores de Sequelize

const router = express.Router();

// Ruta para obtener turnos en un mes específico
router.get('/', async (req, res) => {
    const { mes, anio } = req.query;

    try {
      if (!mes || !anio) {
        return res.status(400).json({ mensaje: 'Por favor proporciona mes y año' });
      }
    
      const inicioMes = new Date(`${anio}-${mes.padStart(2, '0')}-01`);
      const finMes = new Date(inicioMes);
      finMes.setMonth(finMes.getMonth() + 1); // Incrementar un mes para obtener el fin del mes actual
    
      const turnos = await Turno.findAll({
        where: {
          fecha: {
            [Op.gte]: inicioMes,
            [Op.lt]: finMes, // Fechas menores a este límite
          },
        },
      });
    
      res.status(200).json(turnos);
    } catch (error) {
      console.error('Error al obtener turnos:', error);
      res.status(500).json({ mensaje: 'Error al obtener turnos', error: error.message });
    }
    
});

module.exports = router;
