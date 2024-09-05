import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerGroup = async (groupName: string) => {
  return prisma.group.create({
    data: {
      name: groupName,
    },
  });
};
