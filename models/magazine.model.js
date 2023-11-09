import mongoose from "mongoose";

const magazineSchema = mongoose.Schema(
    {
        
        titre: { type: String, required: true },
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        video:{type:String,required: true },
        date: { type: Date, required: true },
        email: { type: String, required: true },
       typemagazine: { type: String, enum: ["sport", "nutrution","medical" ], required: true },
       description: { type: String, required: true },

       
    },
    { timestamps: true }
);

const Magazine= mongoose.model("Magazine", magazineSchema);

export default Magazine;