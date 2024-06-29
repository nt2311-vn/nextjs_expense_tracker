"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TranasctionData {
	text: string;
	amount: number;
}

interface TransactionResult {
	data?: TranasctionData;
	error?: string;
}

const addTransaction = async (
	formData: FormData,
): Promise<TransactionResult> => {
	const textVal = formData.get("text");
	const amountVal = formData.get("amount");

	if (!textVal || textVal === "" || !amountVal) {
		return { error: "Text or amount is missing" };
	}

	const text: string = textVal.toString();
	const amount: number = parseFloat(amountVal.toString());

	const { userId } = auth();

	if (!userId) {
		return { error: "User not found" };
	}

	try {
		const transactionData: TranasctionData = await db.transaction.create({
			data: { text, amount, userId },
		});
		revalidatePath("/");

		return { data: transactionData };
	} catch (err) {
		return { error: `Transaction not added` };
	}
};

export default addTransaction;
