import Reclamation from "../models/reclamation.model.js";

const getReclamationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reclamation = await Reclamation.findById(id);
    if (reclamation === null) {
      return res.status(400).json("reclamation introuvalbles");
    }
    res.status(200).json(reclamation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllReclamations = async (req, res) => {
  try {
    const reclamations = await Reclamtion.find();
    if (reclamations.length === 0) {
      return res.status(400).json("reclamation introuvalble");
    }
    res.status(200).json(reclamations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createReclamation = async (req, res) => {
  try {
    
     await Reclamation.create(req.body);
    res.status(201).json("done");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateReclamation = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom,  prenom,  email, description } = req.body;
    const updatedReclamation = await Reclamtion.findByIdAndUpdate(
      id,
      { nom,  prenom,  email,  description},
      { new: true }
    );
    if (updatedReclamation === null) {
      return res.status(400).json("reclamations introuvalbes");
    }
    res.status(200).json(updatedReclamation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteReclamation = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReclamation = await Reclamation.findByIdAndDelete(id);
    if (deletedReclamation === null) {
      return res.status(400).json("reclamations introuvables");
    }
    res.status(200).json("Reclamation deleted successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};

  const getReclamationsBynom = async (req, res) => {
    try {
      const { name } = req.params;
      const reclamation = await reclamation.find({$or: [
        { nom: { $regex: `^${name}`, $options: "i" } }

      ],}
        
      );
      if (reclamations.length === 0) {
        return res.status(400).json("No reclamation found in the given name");
      }
      res.status(200).json(reclamations);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

export default {
  getReclamationById,
  getAllReclamations,
  createReclamation,
  updateReclamation,
  deleteReclamation,
  getReclamationsBynom,
};