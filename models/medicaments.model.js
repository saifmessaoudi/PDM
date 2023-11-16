import mongoose from "mongoose";
const medicamentSchema = mongoose.Schema(
    {
        Name: { type: String, required: true },
        prix:{ type: String, required: true },
        image : {type: String, default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"},
        type: { type: String, required: true },
        disponibilité:{ type: String, required: true },
 
    },

); 
const medicament = mongoose.model("medicament", medicamentSchema);
export default {medicament}