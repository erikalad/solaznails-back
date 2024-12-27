const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
 const Historial = sequelize.define('historial', {
    id_historial:{
        type: DataTypes.UUID,      
        defaultValue: DataTypes.UUIDV4,    
        allowNull: false,
        primaryKey : true
    },
    ultimaVisita: {
        type: DataTypes.DATEONLY, 
        allowNull: false
    },
    servicios:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    productos:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    observaciones:{
        type: DataTypes.TEXT,
        allowNull: false
    }
  });

return Historial 
};