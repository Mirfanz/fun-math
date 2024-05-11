"use server";

import { auth } from "@/auth";
import prisma from "@/prisma";

export const FetchCreaplineHistories = async () => {
  try {
    const result = await prisma.creaplineHistories.findMany({
      where: { userId: { not: null } },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
            username: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      msg: "",
    };
  } finally {
    prisma.$disconnect();
  }
};

export interface AddCreaplineHistoryProps {
  correct: number;
  inCorrect: number;
  time: number;
}

export const AddCreaplineHistory = async ({
  correct,
  inCorrect,
  time,
}: AddCreaplineHistoryProps) => {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Belum masuk ke akun.");
    await prisma.creaplineHistories.create({
      data: {
        correct,
        inCorrect,
        time,
        createdAt: new Date(),
        user: { connect: { email: session.user.email || "" } },
      },
    });
    return {
      success: true,
      msg: "Your record has been added to database.",
    };
  } catch (error) {
    return {
      success: false,
      msg: "",
    };
  } finally {
    prisma.$disconnect();
  }
};
