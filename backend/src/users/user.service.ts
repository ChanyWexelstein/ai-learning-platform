import prisma from '../config/db';
import bcrypt from 'bcrypt';

export const createUser = async (name: string, phone: string, password: string) => {
  if (!name || !phone || !password) {
    throw new Error('Missing required user fields');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
      data: {
        name,
        phone,
        password: hashedPassword,
      },
    });
  } catch (err) {
    throw new Error('Failed to create user');
  }
};

export const getAllUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (err) {
    throw new Error('Failed to fetch users');
  }
};

export const getUserById = async (id: number) => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (err) {
    throw new Error('Failed to fetch user');
  }
};
