import mongoose from "mongoose";
import medicament from "../models/medicament.model.js"; 


const getAllMedicaments = async (req, res) => {
    try {
        // Use medicamentModel instead of medicament here
        const medicaments = await medicament.find().select("-password");

        if (medicaments.length === 0) {
            return res.status(404).json("No medicaments found");
        }

        res.status(200).json(medicaments);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        const medicaments = await medicament.findById(id).select("-password");
        if (medicaments === null) {
            return res.status(400).json( "No Medicament found" );
        }
        res.status(200).json(medicaments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const updateMedicament = async (req, res) => {
    const { id } = req.params;
    const { Name,prix , image, type,disponibilité } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No medicament with id: ${id}`);
    const updateMedicament= { Name,prix , image, type,disponibilité  };
    await medicamentsModel.findByIdAndUpdate(id, updateMedicament, { new: true });
    res.json(updateMedicament);
};
const addMedicament = async (req, res) => {
    try {
        await medicament.create(req.body)
      res.status(201).json(medicament);
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