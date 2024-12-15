import { Router } from "express";
import {
  getComments,
  createComment,
  getCommentsByUserId,
  deleteCommentByCommentId,
  updateCommentByUserId,
} from "../controllers/commentController";

const router = Router();

// Rutas para manejar los comentarios
router.get("/", getComments);
router.get("/userId/:userId", getCommentsByUserId);
router.post("/", createComment);
router.delete("/commentId/:commentId", deleteCommentByCommentId);
// Ruta para actualizar comentario por userId y commentId
router.put('/userId/:userId/commentId/:commentId', updateCommentByUserId);

export default router;

