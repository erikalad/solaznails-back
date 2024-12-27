const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
 const Preferencias= sequelize.define('preferencias', {
    id_preferencias:{
        type: DataTypes.UUID,      
        defaultValue: DataTypes.UUIDV4,    
        allowNull: false,
        primaryKey : true
    },
    colores: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    formas:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    frecuencia:{
        type: DataTypes.TEXT,
        allowNull: false
    }
  });

return Preferencias
};