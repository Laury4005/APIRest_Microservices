import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/\S+@\S+\.\S+/, 'Por favor ingresa un correo válido'] // Expresión regular para validar el correo
  },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
