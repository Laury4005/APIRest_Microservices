import { Router } from "express";
import { getUsers, createUser, getUserByEmail, updateUserByEmail, deleteUserByEmail } from '../controllers/userController';

const router = Router();

// Rutas para obtener todos los usuarios y crear un nuevo usuario
router.get('/', getUsers);
router.get('/email/:email', getUserByEmail);  // Buscar por email
router.post('/', createUser);

// Rutas para obtener, actualizar y eliminar un usuario por email o id

router.put('/email/:email', updateUserByEmail);        // Actualizar por id
router.delete('/email/:email', deleteUserByEmail);     // Eliminar por id

export default router;

