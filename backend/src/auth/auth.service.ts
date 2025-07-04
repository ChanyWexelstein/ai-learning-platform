import prisma from '../config/db';
import bcrypt from 'bcrypt';
import { ApiError } from '../middlewares/ApiError';

export const register = async (name: string, phone: string, password: string) => {
  const existing = await prisma.user.findFirst({
    where: {
      OR: [
        { name },
        { phone }
      ]
    }
  });

  if (existing) {
    throw new ApiError('A user with this name or phone already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      phone,
      password: hashedPassword
    }
  });
};

export const loginByName = async (name: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      name
    }
  });

  if (!user) {
    throw new ApiError('Incorrect username or password', 401);
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new ApiError('Incorrect username or password', 401);
  }

  return user;
};
