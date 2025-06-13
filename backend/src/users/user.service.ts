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

export const updateUser = async (id: number, name: string, phone: string) => {
  try {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) return null;

    return await prisma.user.update({
      where: { id },
      data: { name, phone },
    });
  } catch (err) {
    throw new Error('Failed to update user');
  }
};

export const deleteUser = async (id: number) => {
  try {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) return null;

    return await prisma.user.delete({ where: { id } });
  } catch (err) {
    throw new Error('Failed to delete user');
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
