import { Request, Response } from "express";
import User, { IUser } from "../models/User";

// CRUD functions 
//<------------------------------>
// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();  // Verifica que la consulta sea correcta
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios", details: error });
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

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;  // Obtener el email desde los parámetros de la URL
    console.log("Email recibido:", email);  // Imprime el email para verificar
    const user = await User.findOne({ email });  // Buscar el usuario por email

    if (!user) {
      console.log(res.status(404).json({ error: "Usuario no encontrado" }));
    }

    console.log(res.json(user));  // Si lo encuentra, devuelve el usuario
  } catch (error) {
    console.log(res.status(500).json({ error: "Error al obtener el usuario", details: error }));
  }
};

// Actualizar un usuario
export const updateUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params; // Obtener el correo original desde los parámetros
  const updatedData = req.body; // Obtener los nuevos datos desde el cuerpo de la solicitud

  try {
    const user = await User.findOne({ email }) as IUser; // Buscar al usuario por su correo original

    // Verificar si el usuario no existe
    if (!user) {
      console.log(res.status(404).json({ error: 'Usuario no encontrado' }));
    }

    // Actualizar los campos del usuario con los datos proporcionados
    Object.assign(user, updatedData); // Esto actualiza todos los atributos pasados en el cuerpo de la solicitud

    // Guardar los cambios en la base de datos
    await user.save();

    // Devolver el usuario actualizado
    console.log(res.status(200).json(user)); 
  } catch (error) {
    console.log(res.status(500).json({ error: 'Error al actualizar el usuario', details: error }));
  }
};

// Eliminar un usuario por email
export const deleteUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params; // Obtener el correo del parámetro de la URL

  try {
    // Buscar el usuario por su correo electrónico
    const user = await User.findOne({ email }) as IUser | null;

    // Verificar si el usuario no existe
    if (!user) {
      console.log(res.status(404).json({ error: 'Usuario no encontrado' }));
    }

    // Eliminar el usuario usando el método deleteOne
    await User.deleteOne({ email }); // Eliminar el documento de la base de datos por email

    // Responder con un mensaje de éxito
    console.log(res.status(200).json({ message: 'Usuario eliminado correctamente' }));
  } catch (error) {
    console.log(res.status(500).json({ error: 'Error al eliminar el usuario', details: error }));
  }
};