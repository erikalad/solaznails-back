const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Inicializamos Sequelize con las variables de entorno
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
  logging: false,
  native: false,
  dialect: 'postgres',
});

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta "models" y los importamos
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Sincroniza y recrea las tablas
// async function recreateTables() {
//   try {
//     await sequelize.sync({ force: true });
//     console.log('Tablas recreadas con éxito.');
//   } catch (error) {
//     console.error('Error al recrear las tablas:', error);
//   } finally {
//     // Cierra la conexión después de realizar las operaciones
//     await sequelize.close();
//   }
// }
// recreateTables()

// Desestructuramos los modelos
const { Clienta, Salud, Preferencias, Historial, Comentarios, Turno } = sequelize.models;

// Definimos las relaciones
// Una clienta tiene una ficha de salud
Clienta.hasOne(Salud, { foreignKey: 'id_clienta', as: 'salud', onDelete: 'CASCADE' });
Salud.belongsTo(Clienta, { foreignKey: 'id_clienta' });

// Una clienta tiene una ficha de preferencias
Clienta.hasOne(Preferencias, { foreignKey: 'id_clienta', as: 'preferencias', onDelete: 'CASCADE' });
Preferencias.belongsTo(Clienta, { foreignKey: 'id_clienta' });

// Una clienta tiene un historial
Clienta.hasOne(Historial, { foreignKey: 'id_clienta', as: 'historial', onDelete: 'CASCADE' });
Historial.belongsTo(Clienta, { foreignKey: 'id_clienta' });

// Una clienta tiene un comentarios
Clienta.hasOne(Comentarios, { foreignKey: 'id_clienta', as: 'comentarios', onDelete: 'CASCADE' });
Comentarios.belongsTo(Clienta, { foreignKey: 'id_clienta' });

// Una clienta tiene muchos turnos
Clienta.hasMany(Turno, { foreignKey: 'id_clienta', as: 'turnos', onDelete: 'CASCADE' });
Turno.belongsTo(Clienta, { foreignKey: 'id_clienta' });

// Exportamos los modelos y la conexión
module.exports = {
  ...sequelize.models, // Exporta los modelos (Clienta, Salud, etc.)
  conn: sequelize, // Exporta la conexión para sincronización
  Op, // Exporta operadores de Sequelize
};
