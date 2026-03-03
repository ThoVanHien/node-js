import { prisma } from "config/client";
import getConnection from "config/db";

const handleCreateUser = async (
  name: string,
  email: string,
  address: string,
) => {
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      address: address,
    },
  });
  return newUser;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const handleDeleteUser = async (id: string) => {
  await prisma.user.delete({
    where: { id: +id },
  });
};

const getUserById = async (id: string) => {
  const user = prisma.user.findUnique({
    where: { id: +id },
  });
  return user;
};
const updateUserById = async (
  id: string,
  email: string,
  address: string,
  name: string,
) => {
  const updatedUser = await prisma.user.update({
    where: { id: +id },
    data: {
      name: name,
      email: email,
      address: address,
    },
  });
  return updatedUser;
};

export {
  handleCreateUser,
  getAllUsers,
  handleDeleteUser,
  getUserById as handleViewUser,
  updateUserById,
};
