// src/app.ts
import express, { Application }  from "express";
import { Request, Response, NextFunction } from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

// Importar rutas de usuarios
import userRoutes from "./routes/userRoutes";

//Middleware
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Puedes personalizar la forma en que registras los errores
  res.status(500).json({ message: 'Algo salió mal. Inténtalo de nuevo más tarde.' });
};

export default errorHandler;
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
const dbURI = "mongodb://127.0.0.1:27017/db1"; // Cambia según tu configuración
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Conexión a MongoDB establecida");
  })
  .catch((err) => {
    console.error("Error de conexión a MongoDB:", err);
  });

// Registrar las rutas de usuarios
app.use("/api/users", userRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
