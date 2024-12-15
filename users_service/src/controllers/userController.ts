// src/controllers/userController.ts
import { Request, Response } from "express";
import User, { IUser } from "../models/user";


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
    const { email } = req.params;  // Obtener el email desde los parámetros de la URL
    const user = await User.findOne({ email });  // Buscar el usuario por email

    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);  // Si se encuentra el usuario, devolverlo
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario", details: error });
  }
};

// Actualizar un usuario por correo (cualquier dato especificado)
export const updateUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.params; // Correo que se va a actualizar
    const updates = req.body; // Datos que se quieren actualizar (pueden ser varios campos)
  
    try {
      // Buscar y actualizar el usuario por correo
      const user = await User.findOneAndUpdate({ email }, updates, { new: true });
  
      // Verificar si el usuario existe
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Devolver el usuario actualizado
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar usuario', details: error });
    }
  };
  
// Eliminar un usuario por correo
export const deleteUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.params; // Correo del usuario a eliminar
  
    try {
      // Buscar y eliminar el usuario por correo
      const user = await User.findOneAndDelete({ email });
  
      // Verificar si el usuario fue encontrado
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Confirmar que el usuario fue eliminado
      res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar usuario', details: error });
    }
  };  