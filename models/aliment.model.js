import mongoose from "mongoose";

const alimentSchema = mongoose.Schema(
    {
        picture: { type: String, required: true },
        alimentName: { type: String, required: true },
        alimentCategorie: { type: String, enum: ["FRUITS ET LÉGUMES", "PRODUITS CÉRÉALIERS ET LÉGUMINEUSES", "PRODUITS LAITIERS", "VIANDE, POISSON ET FRUITS DE MER"], required: true },
        calories: { type: Number, required: true },
        carbohydrates: { type: Number, required: true },
        proteins: { type: Number, required: true },
        fats: { type: Number, required: true },
    },
    { timestamps: true }
);

const Aliment = mongoose.model("Aliment", alimentSchema);

export default Aliment;