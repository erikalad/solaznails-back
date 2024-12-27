const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
 const Salud= sequelize.define('salud', {
    id_salud:{
        type: DataTypes.UUID,      
        defaultValue: DataTypes.UUIDV4,    
        allowNull: false,
        primaryKey : true
    },
    alergias: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    condicionesMedicas:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    estadoUnas:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    tratamientosPrevios:{
        type: DataTypes.TEXT,
        allowNull: false
    }
  });

return Salud
};