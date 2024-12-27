const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
 const Clienta= sequelize.define('clienta', {
    id_clienta:{
        type: DataTypes.UUID,      
        defaultValue: DataTypes.UUIDV4,    
        allowNull: false,
        primaryKey : true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaNacimiento:{
        type: DataTypes.DATEONLY, 
        allowNull: true,
    },
    telefono:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: true,
    }
  });

return Clienta
};