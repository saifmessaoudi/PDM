import mongoose from "mongoose";

const repasSchema = mongoose.Schema(
    {
        nomRepas: { type: String, required: true },
        descriptionRepas: { type: String, required: true },
        aliments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Aliment", required: true }],
        calories: { type: Number, required: true },
        carbs: { type: Number, required: true },
        proteines: { type: Number, required: true },
        fats: { type: Number, required: true },
    },
    { timestamps: true }
);

const Repas = mongoose.model("Repas", repasSchema);

export default Repas;