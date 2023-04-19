import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId: { type: String, required: true },
    status: { type: String },
    amount: { type: Number, required: true },
    transactionType: { type: String, required: true },
    processed: { type: Boolean, required: true },
    referenceId: { type: String, required: false },
    tripId: { type: String, required: false },
});

const Transaction = mongoose.model("transaction", transactionSchema);

export default Transaction;