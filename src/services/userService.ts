import User from '../models/user';
import { Op } from 'sequelize';

class UserService {
  async getAllUsers() {
    return await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['id', 'ASC']],
    });
  }

  async getUserById(id: number) {
    return await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  async blockUser(id: number) {
    const user = await User.findByPk(id);
    
    if (!user) {
      throw new Error('User not found');
    }

    user.isActive = false;
    await user.save();

    
    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async searchUsers(query: string) {
    return await User.findAll({
      where: {
        [Op.or]: [
          { fullName: { [Op.iLike]: `%${query}%` } },
          { email: { [Op.iLike]: `%${query}%` } }
        ]
      },
      attributes: { exclude: ['password'] },
    });
  }
}


export default UserService;