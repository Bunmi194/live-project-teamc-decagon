import Transactions from "../models/TransactionModel";

export const writeTransactionToDatabase = async (transaction: {}) => {
  const newTransaction = new Transactions(transaction);
  return newTransaction
    .save()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("Error: ", err);
      return false;
    });
};
