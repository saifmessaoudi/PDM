import mongoose from "mongoose";
import medicamentsModel from "../models/medicaments.model.js"; 


const getAllMedicaments = async (req, res) => {
    try {
        const medicaments = await medicament.find().select("-password");
        if (users.length === 0) {
            return res.status(400).json( "No pharmacies found" );
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteMedicament = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No medicament with id: ${id}`);

    try {
        // Supprimer la pharmacie avec l'ID spécifié
        await medicament.findByIdAndRemove(id);

        res.status(200).json({ message: "medicament deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the medicament", error: error.message });
    }
};
const getMedicamentById = async (req, res) => {
    const { id } = req.params;
    try {
        const medicament = await medicament.findById(id).select("-password");
        if (medicament === null) {
            return res.status(400).json( "No medicament found" );
        }
        res.status(200).json(medicament);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const updateMedicament = async (req, res) => {
    const { id } = req.params;
    const { Name,prix , image, type,disponibilité } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No medicament with id: ${id}`);
    const updateMedicament= { Name,prix , image, type,disponibilité  };
    await medicament.findByIdAndUpdate(id, updateMedicament, { new: true });
    res.json(updateMedicament);
};
const addMedicament = async (req, res) => {
    try {
      
       const existingPharmacie = await medicamentsModel.medicament.findOne({ name:req.body.Name });
       if (existingMedicament) {
         return res.status(400).json({ message: "Medicament already exists" });
       }

      console.log(req.body)

      const medicament = await medicamentsModel.medicament.create(req.body);
      res.status(201).json({ medicament });
    } catch (error) {
        res.status(400).json(error.message);
   }
};
export default {
    getAllMedicaments,
    getMedicamentById,
    updateMedicament,
    addMedicament,
    deleteMedicament
   


};