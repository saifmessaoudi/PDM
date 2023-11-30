import mongoose from "mongoose";


const PaymentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        balanace: {
            type: Number,
            required: true,
        },
        payment_id: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
            enum: ["in progress", "success", "fail"],
        },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true },
);

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;

