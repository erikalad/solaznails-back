const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
 const Comentarios = sequelize.define('comentarios', {
    id_comentarios:{
        type: DataTypes.UUID,      
        defaultValue: DataTypes.UUIDV4,    
        allowNull: false,
        primaryKey : true
    },
    satisfaccion: {
        type: DataTypes.TEXT, 
        allowNull: false
    },
    sugerencias:{
        type: DataTypes.TEXT,
        allowNull: false
    }
  });

return Comentarios 
};