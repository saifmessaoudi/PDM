import mongoose from "mongoose";

const exerciceshema = mongoose.Schema(
    {
        picture: { type: String, required: true },
        exercicetitle: { type: String, required: true },
        exerciceCategorie: { type: String, enum: ["cardio", "squats", "natation", "fentes", "montées de genoux"], required: true },
        calories: { type: Number, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

const exercice  = mongoose.model("Exercice", exerciceshema);

export default exercice;