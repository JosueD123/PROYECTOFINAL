import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  const { colegiado, nombre, email, dpi, fechaNacimiento, password } = req.body;

  try {
    const existingUser = await User.findOne({ colegiado });
    if (existingUser) {
      return res.status(400).json({ message: 'Número de colegiado ya está en uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      colegiado,
      nombre,
      email,
      dpi,
      fechaNacimiento,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { colegiado, dpi, fechaNacimiento, password } = req.body;

  try {
    const user = await User.findOne({ colegiado });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales incorrectas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales incorrectas.' });
    }

    if (user.dpi !== dpi || user.fechaNacimiento.toISOString().split('T')[0] !== fechaNacimiento) {
      return res.status(400).json({ message: 'Credenciales incorrectas.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
};
