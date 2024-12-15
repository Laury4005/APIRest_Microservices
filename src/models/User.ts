import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,  // Validación de unicidad del email
      match: [/^\S+@\S+\.\S+$/, "Por favor ingresa un correo electrónico válido"],  // Validación de formato de correo electrónico
    },
    password: { type: String, required: true },
  },
  {
    collection: 'users',  // Nombre de la colección
  }
);

export default mongoose.model<IUser>("User", userSchema);

