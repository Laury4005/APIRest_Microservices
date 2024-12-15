import mongoose, { Schema, Document } from "mongoose";

// Interface que define la estructura de un comentario
export interface IComment extends Document {
  userId: string;
  comment: string;
  createdAt?: Date; 
  updateAt?: Date; 
}

// Definición del esquema
const CommentSchema: Schema<IComment> = new Schema(
  {
    userId: { 
      type: String,  // Asegúrate de que este campo use String directamente
      required: [true, "El campo userId es obligatorio"], // Mensaje de error personalizado
      match: /^[a-f\d]{24}$/i, // Validación opcional para IDs tipo ObjectId
    },
    comment: { 
      type: String,  // Este también debe ser String
      required: [true, "El campo comment es obligatorio"], 
      minlength: [3, "El comentario debe tener al menos 3 caracteres"], 
      maxlength: [500, "El comentario no debe exceder los 500 caracteres"] 
    }
  },
  {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
    versionKey: false // Elimina el campo __v de los documentos
  }
);

// Crear índices para mejorar el rendimiento en búsquedas
CommentSchema.index({ userId: 1 });

// Modelo
const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
