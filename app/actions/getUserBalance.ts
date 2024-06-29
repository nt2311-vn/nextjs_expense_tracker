"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const getUserBalance = async (): Promise<{
	balance?: number;
	error?: string;
}> => {
	const { userId } = auth();

	if (!userId) {
		return { error: "User not found" };
	}

	try {
		const transactions = await db.transaction.findMany({ where: { userId } });

		const balance = transactions.reduce(
			(acc, transaction) => acc + transaction.amount,
			0,
		);

		return { balance };
	} catch (err) {
		return { error: "Database error" };
	}
};

export default getUserBalance;
