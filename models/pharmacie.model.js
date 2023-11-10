import mongoose from "mongoose";
const pharmacieSchema = mongoose.Schema(
    {
        Name: { type: String, required: false },
        dispo: { type: String, required: false },
        type: { type: String, required: false },
        phone: { type: String, required: false,unique:false },
        longtitude: { type: Number, required: false },
        lantitude:{ type: Number, required: false },
        email:{ type: String, required: false },
       
    },
    {
        timestamps: true,
    }
); 
const pharmacie = mongoose.model("Pharmacie", pharmacieSchema);
export default {pharmacie}