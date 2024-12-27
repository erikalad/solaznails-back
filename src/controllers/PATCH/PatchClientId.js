const express = require('express');
const multer = require('multer');
const path = require('path');
const { Clienta, Comentarios, Salud, Historial, Preferencias, Turno } = require('./../../db');
const upload = require('../../upload');
const router = express.Router();


// Ruta para editar parcialmente una clienta y sus relaciones
router.patch('/:id', upload.fields([{ name: 'imagenAntes', maxCount: 1 }, { name: 'imagenDespues', maxCount: 1 }]), async (req, res) => {
  const { id } = req.params;
  const { nombre, fechaNacimiento, telefono, email, comentario, salud, historial, preferencias, turnos, imagenAntes , imagenDespues} = req.body;
  console.log(req.body)
  try {
    // Buscar la clienta
    const clienta = await Clienta.findByPk(id);
    if (!clienta) {
      return res.status(404).json({ message: 'Clienta no encontrada' });
    }

    // Actualizar solo los campos enviados
    await clienta.update({
      nombre: nombre || clienta.nombre,
      fechaNacimiento: fechaNacimiento || clienta.fechaNacimiento,
      telefono: telefono || clienta.telefono,
      email: email || clienta.email,
    });

    // Actualizar comentario, si se envió
    if (comentario) {
      const comentarios = await Comentarios.findOne({ where: { id_clienta: id } });
      if (comentarios) {
        await comentarios.update({
          satisfaccion: comentario.satisfaccion || comentarios.satisfaccion,
          sugerencias: comentario.sugerencias || comentarios.sugerencias,
        });
      }
    }

    // Actualizar salud, si se envió
    if (salud) {
      const saludRecord = await Salud.findOne({ where: { id_clienta: id } });
      if (saludRecord) {
        await saludRecord.update({
          alergias: salud.alergias || saludRecord.alergias,
          condicionesMedicas: salud.condicionesMedicas || saludRecord.condicionesMedicas,
          estadoUnas: salud.estadoUnas || saludRecord.estadoUnas,
          tratamientosPrevios: salud.tratamientosPrevios || saludRecord.tratamientosPrevios,
        });
      }
    }

    // Actualizar historial, si se envió
    if (historial) {
      const historialRecord = await Historial.findOne({ where: { id_clienta: id } });
      if (historialRecord) {
        await historialRecord.update({
          ultimaVisita: historial.ultimaVisita || historialRecord.ultimaVisita,
          servicios: historial.servicios || historialRecord.servicios,
          productos: historial.productos || historialRecord.productos,
          observaciones: historial.observaciones || historialRecord.observaciones,
        });
      }
    }

    // Actualizar preferencias, si se envió
    if (preferencias) {
      const preferenciasRecord = await Preferencias.findOne({ where: { id_clienta: id } });
      if (preferenciasRecord) {
        await preferenciasRecord.update({
          colores: preferencias.colores || preferenciasRecord.colores,
          formas: preferencias.formas || preferenciasRecord.formas,
          frecuencia: preferencias.frecuencia || preferenciasRecord.frecuencia,
        });
      }
    }

    // Actualizar o crear turnos, si se enviaron
    if (turnos || imagenDespues || imagenAntes) {
      for (let turno of turnos) {
        if (turno.id_turno) {
          // Si el turno tiene id_turno, actualizamos el turno existente
          const turnoRecord = await Turno.findOne({ where: { id_turno: turno.id_turno } });
          if (turnoRecord) {
            // Actualizamos las imágenes si se han enviado
            const imagenAntesUrl = req.files?.imagenAntes ? `http://localhost:3001/uploads/${req.files.imagenAntes[0].filename}` : null;
            const imagenDespuesUrl = req.files?.imagenDespues ? `http://localhost:3001/uploads/${req.files.imagenDespues[0].filename}` : null;
            console.log(imagenAntesUrl,imagenDespuesUrl)
            await turnoRecord.update({
              nombre: turno.nombre || turnoRecord.nombre,
              fecha: turno.fecha || turnoRecord.fecha,
              hora: turno.hora || turnoRecord.hora,
              cancelado: turno.cancelado || turnoRecord.cancelado,
              imagenAntes: imagenAntesUrl,
              imagenDespues: imagenDespuesUrl,
            });
          }
        } else {
          // Si el turno no tiene id_turno, creamos un nuevo turno
          const imagenAntesUrl = req.files?.imagenAntes ? `http://localhost:3001/uploads/${req.files.imagenAntes[0].filename}` : null;
          const imagenDespuesUrl = req.files?.imagenDespues ? `http://localhost:3001/uploads/${req.files.imagenDespues[0].filename}` : null;
          console.log(imagenAntesUrl,imagenDespuesUrl)
          await Turno.create({
            nombre: turno.nombre,
            fecha: turno.fecha,
            hora: turno.hora,
            id_clienta: id, // Vinculamos el turno a la clienta
            imagenAntes: imagenAntesUrl,
            imagenDespues: imagenDespuesUrl,
          });
        }
      }
    }

    // Responder con los datos actualizados
    const updatedClienta = await Clienta.findByPk(id, {
      include: ['comentarios', 'salud', 'historial', 'preferencias', 'turnos'],
    });

    res.json(updatedClienta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la clienta' });
  }
});

module.exports = router;
