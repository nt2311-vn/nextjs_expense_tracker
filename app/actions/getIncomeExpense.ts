"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const getIncomeExpense = async (): Promise<{
	income?: number;
	expense?: number;
	error?: string;
}> => {
	const { userId } = auth();

	if (!userId) {
		return { error: "User not found" };
	}

	try {
		const transactions = await db.transaction.findMany({ where: { userId } });
		const income = transactions.reduce(
			(acc, tran) => acc + (tran.amount > 0 ? tran.amount : 0),
			0,
		);

		const expense = transactions.reduce(
			(acc, tran) => acc + (tran.amount < 0 ? tran.amount : 0),
			0,
		);

		return { income, expense };
	} catch (err) {
		return { error: "Database error" };
	}
};

export default getIncomeExpense;
