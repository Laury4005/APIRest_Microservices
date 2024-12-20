import { Router } from 'express';
import { getUsers, 
         createUser, 
         getUserByEmail, 
         updateUserByEmail, 
         deleteUserByEmail, 
         deleteUserAndComments ,
         updateUserById,
         getUserById,
        } from '../controllers/userController';

const router = Router();

// Rutas para obtener todos los usuarios, buscar por correo y crear un usuario
router.get('/', getUsers);
router.get('/email/:email', getUserByEmail);  // Buscar por email
router.get('/userId/:userId', getUserById);
router.post('/', createUser);

// Rutas para actualizar y eliminar un usuario por correo
//router.put('/email/:email', updateUserByEmail);  // Actualizar por correo
// Ruta para actualizar un usuario por ID
router.put('/userId/:userId', updateUserById);
router.delete('/email/:email', deleteUserByEmail);  // Eliminar por correo
router.delete('/delete-with-comments/:email', deleteUserAndComments); // Método nuevo
export default router;
