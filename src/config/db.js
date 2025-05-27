const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// Cargar variables de entorno
dotenv.config();

// Crear instancia de Sequelize con variables de entorno
const sequelize = new Sequelize(
  process.env.AZURE_MYSQL_DATABASE,
  process.env.AZURE_MYSQL_USER,
  process.env.AZURE_MYSQL_PASSWORD,
  {
    host: process.env.AZURE_MYSQL_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Asegúrate de entender los riesgos si lo dejas en false
      },
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false, // Cambiar a true para ver las consultas en consola
  }
);
