import Transaction from "../models/TransactionModel";

export const writeTransactionToDatabase = async (transaction: {}) => {
  const newTransaction = new Transaction(transaction);
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
