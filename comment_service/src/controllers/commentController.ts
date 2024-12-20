import { Request, Response } from "express";
import Comment from "../models/comment";
import mongoose from "mongoose";
import axios from "../axiosConfig"; // Importa la configuración de Axios
import dotenv from 'dotenv';
dotenv.config();

// Obtener todos los comentarios
export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener comentarios" });
  }
};

// Crear un nuevo comentario
export const createComment = async (req: Request, res: Response) => {
  try {
    const { userId, comment } = req.body;
    const newComment = new Comment({ userId, comment });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: "Error al crear comentario" });
  }
};

// Obtener comentarios por ID de usuario
export const getCommentsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const comments = await Comment.find({ userId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener comentarios del usuario" });
  }
};


// Eliminar un comentario por commentId
export const deleteCommentByCommentId = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  
  // Verificar si el commentId tiene el formato correcto de ObjectId
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
     res.status(400).json({ error: "ID de comentario no válido" });
  }

  try {
    const comment = await Comment.findByIdAndDelete(commentId);  // Buscar por _id
    if (!comment) {
       res.status(404).json({ error: 'Comentario no encontrado' });
    }
    res.status(200).json({ message: "Comentario eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar comentario" });
  }
};


export const updateCommentByUserId = async (req: Request, res: Response) => {
  const { userId, commentId } = req.params; // Obtener userId y commentId de los parámetros de la URL
  const { comment } = req.body; // Suponiendo que el cuerpo contiene el nuevo comentario

  try {
    // Buscar el comentario por commentId y userId
    const existingComment = await Comment.findOne({ _id: commentId, userId });

    // Comprobar si se encontró el comentario
    if (!existingComment) {
      res.status(404).json({ error: "Comentario no encontrado o no pertenece al usuario" });
      return; // Salir de la función para evitar más ejecuciones
    }

    // Si existe, actualizar el comentario
    existingComment.comment = comment || existingComment.comment;  // Si se pasa un nuevo comentario, lo actualiza

    // Guardar el comentario actualizado
    await existingComment.save();

    // Enviar respuesta de éxito
    res.status(200).json(existingComment);
  } catch (error) {
    // Enviar error si ocurre un problema en la actualización
    res.status(500).json({ error: "Error al actualizar comentario" });
  }
};

// Endpoint para obtener los comentarios de un usuario por su email
export const getCommentsByUserEmail = async (req: Request, res: Response) => {
  const { email } = req.params;  // Extrae el email de los parámetros

  try {
    // Solicitud HTTP al microservicio de usuarios para obtener el 'userId' por el email
    const userResponse = await axios.get(`http://localhost:5000/api/users/email/${email}`);
    
    if (!userResponse.data) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return; // Salimos de la función si no encontramos el usuario
    }

    const userId = userResponse.data._id; // Asegúrate que '_id' es el valor correcto
    console.log("userId encontrado:", userId);

    // Usamos directamente el 'userId' en la consulta, sin necesidad de conversión explícita
    const comments = await Comment.find({ userId });

    console.log("Comentarios encontrados:", comments);

    if (comments.length === 0) {
      res.status(404).json({ error: 'No se encontraron comentarios para este usuario', userId });
    } else {
      res.json(comments);
    }
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    res.status(500).json({ error: 'Error al obtener comentarios', details: error });
  }
};