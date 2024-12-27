const { DataTypes } = require("sequelize");

// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // Defino el modelo
  const Turno = sequelize.define("turno", {
    id_turno: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    cancelado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    imagenAntes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagenDespues: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Turno;
};
