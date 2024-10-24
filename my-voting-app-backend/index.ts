import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes';
import campaignRoutes from './src/routes/campaignRoutes';
import candidateRoutes from './src/routes/candidateRoutes';
import voteRoutes from './src/routes/voteRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos', err));

// Rutas
app.use('/api', authRoutes);
app.use('/api', campaignRoutes);
app.use('/api', candidateRoutes);
app.use('/api', voteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
