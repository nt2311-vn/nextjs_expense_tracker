import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Transaction } from "@/types/Transaction";

const getTransactions = async (): Promise<{
  transactions?: Transaction[];
  error?: string;
}> => {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return { transactions };
  } catch (err) {
    return { error: "Database error" };
  }
};

export default getTransactions;
