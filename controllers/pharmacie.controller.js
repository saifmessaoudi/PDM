import mongoose from "mongoose";
import pharmacieModel from "../models/pharmacie.model.js";



const getAllPharmacies = async (req, res) => {
    try {
        const users = await pharmacie.find().select("-password");
        if (users.length === 0) {
            return res.status(400).json( "No pharmacies found" );
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const getPharmacieById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await pharmacie.findById(id).select("-password");
        if (user === null) {
            return res.status(400).json( "No pharmacy found" );
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const updatePharmacie = async (req, res) => {
    const { id } = req.params;
    const { Name,dispo , type, phone,longtitude,lantitude,email } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No pharmacie with id: ${id}`);
    const updatePharmacie = { Name,dispo , type, phone,longtitude,lantitude,email };
    await pharmacie.findByIdAndUpdate(id, updatePharmacie, { new: true });
    res.json(updatePharmacie);
};
const addPharmacie = async (req, res) => {
    try {
      
       const existingPharmacie = await pharmacieModel.pharmacie.findOne({ email:req.body.email });
       if (existingPharmacie) {
         return res.status(400).json({ message: "Pharmacie already exists" });
       }

      console.log(req.body)

      const pharmacie = await pharmacieModel.pharmacie.create(req.body);
      res.status(201).json({ pharmacie });
    } catch (error) {
        res.status(400).json(error.message);
   }
};
const deletePharmacie = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No pharmacy with id: ${id}`);

    try {
        // Supprimer la pharmacie avec l'ID spécifié
        await pharmacie.findByIdAndRemove(id);

        res.status(200).json({ message: "Pharmacy deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the pharmacy", error: error.message });
    }
};

const searchPharmaciesByName = async (req, res) => {
    const { name } = req.query; // Obtenez le nom à rechercher à partir des paramètres de requête (query parameter)

    try {
        // Recherchez les pharmacies dont le nom contient le texte spécifié (insensible à la casse)
        const pharmacies = await pharmacie.find({ Name: { $regex: name, $options: 'i' } }).select("-password");
        
        if (pharmacies.length === 0) {
            return res.status(400).json("No pharmacies found with the specified name");
        }
        
        res.status(200).json(pharmacies);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while searching for pharmacies", error: error.message });
    }
};

const getNightPharmacies = async (req, res) => {
    try {
        const nightPharmacies = await pharmacie.find({ dispo: "nuit" }).select("-password");
        
        if (nightPharmacies.length === 0) {
            return res.status(400).json("No night pharmacies found");
        }
        
        res.status(200).json(nightPharmacies);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching night pharmacies", error: error.message });
    }
};

const getDayPharmacies = async (req, res) => {
    try {
        // Recherchez les pharmacies de jour en fonction de votre critère de filtrage (par exemple, le champ "dispo" indique la disponibilité de jour)
        const dayPharmacies = await pharmacie.find({ dispo: "jour" }).select("-password");
        
        if (dayPharmacies.length === 0) {
            return res.status(400).json("No day pharmacies found");
        }
        
        res.status(200).json(dayPharmacies);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching day pharmacies", error: error.message });
    }
};
export default {
    getAllPharmacies,
    getPharmacieById,
    updatePharmacie,
    addPharmacie,
    deletePharmacie,
    searchPharmaciesByName,
    getNightPharmacies,
    getDayPharmacies


};

