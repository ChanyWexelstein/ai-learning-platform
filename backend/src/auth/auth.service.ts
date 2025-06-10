import { prisma } from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (name: string, phone: string, password: string) => {
  const existing = await prisma.user.findUnique({ where: { phone } });
  if (existing) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { name, phone, password: hashedPassword },
  });
};

export const login = async (phone: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) throw new Error('User not found');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
};
