import mongoose from "mongoose";

const repasSchema = mongoose.Schema(
    {
        repasName: { type: String, required: true },
        repasDescription: { type: String, required: true },
        aliments: {type: Array, default: []},
        calories: { type: Number },
        carbs: { type: Number},
        proteines: { type: Number },
        fats: { type: Number},
        confidentiality: { type: String, enum: ["public", "prive"], default: "public"},
        owner: { type: String},
    },
    { timestamps: true }
);

const Repas = mongoose.model("Repas", repasSchema);

export default Repas;