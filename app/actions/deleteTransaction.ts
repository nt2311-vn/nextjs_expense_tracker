"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const deleteTransaction = async (
  transactionId: string,
): Promise<{ error?: string; message?: string }> => {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transaction = await db.transaction.delete({
      where: { userId, id: transactionId },
    });

    revalidatePath("/");

    return { message: "Transaction deleted" };
  } catch (err) {
    return { error: "Database error" };
  }
};

export default deleteTransaction;
