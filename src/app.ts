import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/users', userRoutes);


app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});


app.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});


app.use((error: any, req: any, res: any, next: any) => {
  console.error(error.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;