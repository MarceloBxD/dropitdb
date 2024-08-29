import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../utils/bcryptUtils";

const prisma = new PrismaClient();

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const hashedPassword = await hashPassword(password);
  return prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return user;
};
