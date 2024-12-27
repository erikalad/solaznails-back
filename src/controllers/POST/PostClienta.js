const express = require('express');
const { Clienta, Comentarios, Salud, Historial, Preferencias, Turno } = require('./../../db');
const upload = require('./../../upload');  // Importar configuración de multer
const router = express.Router();

// Ruta para crear una nueva clienta
router.post('/', upload.fields([
  { name: 'turnos[0].imagenAntes', maxCount: 1 },  // Subir imagenAntes
  { name: 'turnos[0].imagenDespues', maxCount: 1 }  // Subir imagenDespues
]), async (req, res) => {
  const { nombre, fechaNacimiento, telefono, email, comentario, salud, historial, preferencias, turnos } = req.body;

  try {
    // Crear la clienta
    const newClienta = await Clienta.create({
      nombre,
      fechaNacimiento,
      telefono,
      email
    });

    // Crear el comentario si se envió
    if (comentario) {
      const newComentario = await Comentarios.create({
        id_clienta: newClienta.id_clienta,  // Relacionar el comentario con la clienta
        satisfaccion: comentario.satisfaccion,
        sugerencias: comentario.sugerencias
      });
    }

    // Crear la salud si se envió
    if (salud) {
      const newSalud = await Salud.create({
        id_clienta: newClienta.id_clienta,  // Relacionar la salud con la clienta
        alergias: salud.alergias,
        condicionesMedicas: salud.condicionesMedicas,
        estadoUnas: salud.estadoUnas,
        tratamientosPrevios: salud.tratamientosPrevios
      });
    }

    // Crear el historial si se envió
    if (historial) {
      const newHistorial = await Historial.create({
        id_clienta: newClienta.id_clienta,  // Relacionar el historial con la clienta
        ultimaVisita: historial.ultimaVisita,
        servicios: historial.servicios,
        productos: historial.productos,
        observaciones: historial.observaciones
      });
    }

    // Crear las preferencias si se enviaron
    if (preferencias) {
      const newPreferencias = await Preferencias.create({
        id_clienta: newClienta.id_clienta,  // Relacionar las preferencias con la clienta
        colores: preferencias.colores,
        formas: preferencias.formas,
        frecuencia: preferencias.frecuencia
      });
    }

    // Crear los turnos si se enviaron
    if (turnos && Array.isArray(turnos)) {
      for (let turno of turnos) {
        // Aquí asignamos las rutas de las imágenes subidas por multer
        const imagenAntes = req.files['turnos[0].imagenAntes'] ? req.files['turnos[0].imagenAntes'][0].filename : null;
        const imagenDespues = req.files['turnos[0].imagenDespues'] ? req.files['turnos[0].imagenDespues'][0].filename : null;

        await Turno.create({
          id_clienta: newClienta.id_clienta,  // Relacionar el turno con la clienta
          nombre: turno.nombre,
          fecha: turno.fecha,
          hora: turno.hora,
          cancelado: turno.cancelado || false,
          imagenAntes,  // Guardar la ruta de la imagenAntes
          imagenDespues  // Guardar la ruta de la imagenDespues
        });
      }
    }

    // Responder con la nueva clienta creada
    const createdClienta = await Clienta.findByPk(newClienta.id_clienta, {
      include: ['comentarios', 'salud', 'historial', 'preferencias', 'turnos']
    });

    res.status(201).json(createdClienta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la clienta' });
  }
});

module.exports = router;
