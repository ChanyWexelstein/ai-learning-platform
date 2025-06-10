import { prisma } from '../config/db';
import { CreateUserDto, UpdateUserDto, UserResponse } from './user.model';
import { CustomError } from '../middlewares/errorHandler';

export class UserService {
  // Create new user
  async createUser(userData: CreateUserDto): Promise<UserResponse> {
    try {
      const user = await prisma.user.create({
        data: userData,
        select: {
          id: true,
          name: true,
          phone: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Get all users
  async getAllUsers(): Promise<UserResponse[]> {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          phone: true,
        },
        orderBy: {
          id: 'desc',
        },
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  // Get user by ID
  async getUserById(id: number): Promise<UserResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          phone: true,
        },
      });

      if (!user) {
        throw new CustomError('משתמש לא נמצא', 404);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Get user by phone
  async getUserByPhone(phone: string): Promise<UserResponse | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { phone },
        select: {
          id: true,
          name: true,
          phone: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Update user
  async updateUser(id: number, userData: UpdateUserDto): Promise<UserResponse> {
    try {
      // Check if user exists
      await this.getUserById(id);

      const updatedUser = await prisma.user.update({
        where: { id },
        data: userData,
        select: {
          id: true,
          name: true,
          phone: true,
        },
      });

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  // Delete user
  async deleteUser(id: number): Promise<void> {
    try {
      // Check if user exists
      await this.getUserById(id);

      await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  // Get user with learning history
  async getUserWithHistory(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          phone: true,
          prompts: {
            select: {
              id: true,
              prompt: true,
              response: true,
              createdAt: true,
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
              subCategory: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });

      if (!user) {
        throw new CustomError('משתמש לא נמצא', 404);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}