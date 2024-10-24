import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender la interfaz `Request` para incluir `userId`
declare module 'express' {
  interface Request {
    userId?: string;
  }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'No se proporcionó un token.' });
    return; // Asegúrate de retornar después de enviar la respuesta
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string };
    req.userId = decoded.id; // Guardar el id del usuario en la solicitud
    next(); // Continuar al siguiente middleware o controlador
  } catch (err) {
    res.status(401).json({ message: 'Token no válido.' });
    return; // Asegúrate de retornar después de enviar la respuesta
  }
};
