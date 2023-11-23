import mongoose from "mongoose";
import medicament from "../models/medicament.model.js"; 
import axios from 'axios';  // Importez axios ici



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
const getDermatologique = async (req, res) => {
    try {
        const medicaments = await medicament.find({ type: "Dermatologique" }).select("-password");
        
        if (medicaments.length === 0) {
            return res.status(400).json(" no Dermatologique");
        }
        
        res.status(200).json(medicaments);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching Dermatologique", error: error.message });
    }
};
const getBiologique= async (req, res) => {
    try {
        const medicaments = await medicament.find({ type: "Biologique" }).select("-password");
        
        if (medicaments.length === 0) {
            return res.status(400).json(" no Biologique");
        }
        
        res.status(200).json(medicaments);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching Biologique", error: error.message });
    }
};
const makeAxiosRequest = async () => {
    try {
        const paymentId = '';
        const appToken = '84375202-d211-45f9-9010-2e1bc319eb2b';
        const appSecret = '0848d716-c816-4c46-b84d-fe4aeed50b94';

        const url = `https://developers.flouci.com/api/verify_payment/${paymentId}`;

        const headers = {
            'Content-Type': 'application/json',
            'apppublic': appToken,
            'appsecret': appSecret
        };

        const response = await axios.get(url, { headers });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};


export default {
    getAllMedicaments,
    getMedicamentById,
    updateMedicament,
    addMedicament,
    deleteMedicament,
    getBiologique,
    getDermatologique,
    makeAxiosRequest 
   


};