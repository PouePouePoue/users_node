import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import UserService from '../services/userService'; // Убрали фигурные скобки

const userService = new UserService();

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const user = await userService.getUserById(parseInt(req.params.id));
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const blockUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await userService.blockUser(parseInt(req.params.id));
    res.json({ message: 'User blocked successfully', user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const searchUsers = async (req: AuthRequest, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const users = await userService.searchUsers(q);
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};