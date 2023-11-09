import mongoose from "mongoose";

const reclamationSchema = mongoose.Schema(
    {
        
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        email: { type: String, required: true },
       description: { type: String, required: true },
       
    },
    { timestamps: true }
);

const Reclamation = mongoose.model("Reclamation", reclamationSchema);

export default Reclamation;