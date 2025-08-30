import jwt from 'jsonwebtoken';
import  User  from '../models/user';

class AuthService {
  async register(userData: {
    fullName: string;
    dateOfBirth: Date;
    email: string;
    password: string;
    role?: 'admin' | 'user';
  }) {
   
    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    return await User.create({
      fullName: userData.fullName,
      dateOfBirth: userData.dateOfBirth,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'user',
    });
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
      throw new Error('User account is deactivated');
    }

    const isValidPassword = await (user as any).validatePassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    
    const { password: _, ...userWithoutPassword } = user.toJSON();

    return {
      token,
      user: userWithoutPassword,
    };
  }
}


export default AuthService;