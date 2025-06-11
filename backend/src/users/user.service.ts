import prisma from '../config/db';

export const createUser = async (name: string, phone: string, password: string) => {
  return prisma.user.create({ data: { name, phone, password } });
};

export const updateUser = async (id: number, name: string, phone: string) => {
  return prisma.user.update({
    where: { id },
    data: { name, phone },
  });
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({ where: { id } });
};

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};
