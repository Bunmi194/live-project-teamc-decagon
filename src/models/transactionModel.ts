import mongoose, { Schema } from "mongoose";

const transactionsSchema = new Schema({
    status: {
        type: "string",
        enum: ["success", "failed"],
        required: true
    },
    transactionType: {
        type: "string",
        enum: ["credit", "debit"],
        required: true
    },
    userId: {
        type: "string",
        required: true
    },
    referenceId: {
        type: "string",
        required: true
    },
    amount: {
        type: "number",
        required: true
    },


})

transactionsSchema.set("timestamps", true)

const Transactions = mongoose.model("Transaction", transactionsSchema);

export default Transactions;