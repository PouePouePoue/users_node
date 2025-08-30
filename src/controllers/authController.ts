import { Request, Response } from 'express';
import AuthService from '../services/authService'; 

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);

    
    const { password, ...userResponse } = user.toJSON();

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const result = await authService.login(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};