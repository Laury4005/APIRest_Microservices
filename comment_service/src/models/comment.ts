import mongoose, { Schema, Document, Model } from 'mongoose';

// Interfaz para definir la estructura del comentario
export interface IComment extends Document {
  userId: string;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Definición del esquema
const CommentSchema: Schema<IComment> = new Schema(
  {
    userId: { 
      type: String,
      required: [true, "El campo userId es obligatorio"]
    },
    comment: {
      type: String,
      required: [true, "El campo comment es obligatorio"],
      minlength: [3, "El comentario debe tener al menos 3 caracteres"],
      maxlength: [500, "El comentario no debe exceder los 500 caracteres"]
    }
  },
  {
    timestamps: true,  // Agrega automáticamente createdAt y updatedAt
    versionKey: false  // Elimina el campo __v de los documentos
  }
);

// Modelo de Comment basado en el esquema
const Comment: Model<IComment> = mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
