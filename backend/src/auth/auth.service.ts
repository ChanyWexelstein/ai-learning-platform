import prisma from '../config/db';
import bcrypt from 'bcrypt';
import { ApiError } from '../middlewares/ApiError'; 

export const register = async (name: string, phone: string, password: string) => {
  const existing = await prisma.user.findFirst({ where: { OR: [{ name }, { phone }] } });
  if (existing) throw new ApiError('User with this name or phone already exists', 400);

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: { name, phone, password: hashedPassword },
  });
};

export const loginByName = async (name: string, password: string) => {
  const user = await prisma.user.findFirst({ where: { name } });
  if (!user) throw new ApiError('User not found', 404);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new ApiError('Invalid credentials', 401);

  return user;
};
