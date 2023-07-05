const { Sequelize, DataTypes } = require('sequelize');

const user = "root"
const password = "admin"
const database = "superheroes"

const sequelize = new Sequelize(database, user, password , {
  host: 'localhost',
  dialect: 'mysql',
});

const Superhero = sequelize.define('Superhero', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  editorial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creador: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync()
  .then(() => {
    console.log('Modelo y tablas sincronizadas');
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo:', error);
  });

module.exports = Superhero;
