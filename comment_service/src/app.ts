// src/app.ts
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

// Importar las rutas de usuarios
import commentRoutes from "./routes/commentRoutes";

dotenv.config();

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
const dbURI = "mongodb://lp:lp@127.0.0.1:27017/CommentsDB";   // Cambiar si es necesario
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Conexión a MongoDB establecida");
  })
  .catch((err) => {
    console.error("Error de conexión a MongoDB:", err);
  });

// Usar las rutas de usuarios
app.use("/api/comments", commentRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
