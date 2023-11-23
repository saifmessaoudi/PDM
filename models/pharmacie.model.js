import mongoose from "mongoose";
const pharmacieSchema = mongoose.Schema(
    {
        Name: { type: String, required: true },
        dispo: { type: String, required: true },
        type: { type: String, required: true },
        phone: { type: String, required: true,unique:false },
        longtitude: { type: String, required: true },
        attitude:{ type: String, required: true },
        email:{ type: String, required: true },
        position:{ type: String, required: true },

        
       


       
    },

    
); 
const pharmacie = mongoose.model("Pharmacie", pharmacieSchema);
export default pharmacie