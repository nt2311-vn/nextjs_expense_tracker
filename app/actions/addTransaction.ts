"use server";

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

	const transactionData: TranasctionData = {
		text,
		amount,
	};

	return { data: transactionData };
};

export default addTransaction;
