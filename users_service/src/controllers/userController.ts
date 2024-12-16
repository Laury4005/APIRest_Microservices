import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import axios from "../axiosConfig"; // Importa la configuración de Axios
import dotenv from 'dotenv';
dotenv.config();
// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const newUser: IUser = new User({ name, email, password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

// Buscar usuario por email
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
       res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Solicitud a otro microservicio para obtener comentarios del usuario
    const commentsResponse = await axios.get(`/comments/user/${email}`);
    const comments = commentsResponse.data;

    res.json({ user, comments });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario", details: error });
  }
};

// Actualizar un usuario por correo
export const updateUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  const updates = req.body;

  try {
    const user = await User.findOneAndUpdate({ email }, updates, { new: true });

    if (!user) {
       res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar usuario", details: error });
  }
};

// Eliminar un usuario por correo
export const deleteUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    // Buscar al usuario por su correo
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Obtener el userId del usuario
    const userId = user._id;

    // Eliminar el usuario de la base de datos
    await User.findOneAndDelete({ email });
    // Revisar process.env.COMMENTS_SERVICE_URL ||
    // Solicitar la eliminación de los comentarios por userId en el microservicio de comentarios
    const commentServiceUrl =  "http://localhost:4000/api/comments";
    const response = await axios.delete(`${commentServiceUrl}/userId/${userId}`);  // Usamos userId, no email

    if (response.status === 200) {
      res.status(200).json({ message: "Usuario y comentarios eliminados exitosamente" });
    } else {
      res.status(500).json({ error: "Error al eliminar comentarios" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar usuario y comentarios", details: error });
  }
};


// Elimina los comentarios asociados a un userEmail
export const deleteUserAndComments = async (req: Request, res: Response) => {
  const { email } = req.params;  // Obtener el correo del usuario de los parámetros

  try {
    // 1. Buscar al usuario por su correo
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
    }

    const userId = user._id;

    // 2. Eliminar al usuario de la base de datos
    await User.findOneAndDelete({ email });

    // 3. Hacer una solicitud a un microservicio para eliminar los comentarios
    const commentServiceUrl = "http://localhost:4000/api/comments";
    const response = await axios.delete(`${commentServiceUrl}/userId/${userId}`);

    if (response.status === 200) {
      res.status(200).json({ message: "Usuario y comentarios eliminados" });
    } else {
      res.status(500).json({ error: "No se pudieron eliminar los comentarios" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar usuario y comentarios" });
  }
};