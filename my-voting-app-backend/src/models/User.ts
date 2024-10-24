import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  colegiado: {
    type: String,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dpi: {
    type: String,
    required: true,
    unique: true
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);
export default User;
