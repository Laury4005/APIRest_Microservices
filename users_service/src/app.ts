// src/app.ts
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

// Importar las rutas de usuarios
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
const dbURI = "mongodb://lp:lp@127.0.0.1:27017/db1";  // Cambiar si es necesario
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Conexión a MongoDB establecida");
  })
  .catch((err) => {
    console.error("Error de conexión a MongoDB:", err);
  });

// Usar las rutas de usuarios
app.use("/api/users", userRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
