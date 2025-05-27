const express = require("express");
const morgan = require("morgan");
const sequelize = require("./src/config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/docs/swagger");

const app = express();

// Middlewares
const cors = require("./src/middleware/cors");
const authorization = require("./src/middleware/auth");
const notFound = require("./src/middleware/notFound");

// Rutas
const authRoute = require("./src/routes/auth.route");
const taskListRoute = require("./src/routes/taskList.route");
const taskRoute = require("./src/routes/task.route");

// Configuraciones
const PORT = process.env.PORT || 3000; // Azure usa process.env.PORT

// Middlewares globales
app.use(cors);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentación
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas públicas
app.use("/auth", authRoute);

// Middleware de autorización
app.use(authorization);

// Rutas protegidas
app.use("/taskList", taskListRoute);
app.use("/tasks", taskRoute);

// Ruta no encontrada
app.use(notFound);

// Inicio del servidor
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Conectado a la base de datos MySQL");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ Error de conexión:", err));
