import { Router } from 'express';
import { getUsers, createUser, getUserByEmail, updateUserByEmail, deleteUserByEmail } from '../controllers/userController';

const router = Router();

// Rutas para obtener todos los usuarios, buscar por correo y crear un usuario
router.get('/', getUsers);
router.get('/email/:email', getUserByEmail);  // Buscar por email
router.post('/', createUser);

// Rutas para actualizar y eliminar un usuario por correo
router.put('/email/:email', updateUserByEmail);  // Actualizar por correo
router.delete('/email/:email', deleteUserByEmail);  // Eliminar por correo

export default router;
