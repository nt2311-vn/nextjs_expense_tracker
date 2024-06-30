import { Transaction } from "@/types/Transaction";
import TransactionItem from "./TransactionItem";
import getTransactions from "@/app/actions/getTransactions";

const TransactionList = async () => {
  const { transactions, error } = await getTransactions();

  if (error) {
    return <p className="error">{error}</p>;
  }
  return (
    <>
      <h3>Histroy</h3>
      <ul className="list">
        {transactions &&
          transactions.map((transaction: Transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
      </ul>
    </>
  );
};

export default TransactionList;
