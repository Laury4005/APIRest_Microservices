import express, { Router } from 'express';
import {
  getComments,
  createComment,
  getCommentsByUserId,
  deleteCommentByCommentId,
  updateCommentByUserId,
  getCommentsByUserEmail ,
} from "../controllers/commentController";

const router = express.Router();

// Rutas para manejar los comentarios
router.get("/", getComments);
router.get("/userId/:userId", getCommentsByUserId);
router.post("/", createComment);
router.delete("/commentId/:commentId", deleteCommentByCommentId);
// Ruta para actualizar comentario por userId y commentId
router.put('/userId/:userId/commentId/:commentId', updateCommentByUserId);

router.get('/user/:email', getCommentsByUserEmail);
export default router;