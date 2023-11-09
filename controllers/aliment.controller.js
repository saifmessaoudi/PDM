import Aliment from "../models/aliment.model.js";

const getAlimentById = async (req, res) => {
  try {
    const { id } = req.params;
    const aliment = await Aliment.findById(id);
    if (aliment === null) {
      return res.status(400).json("No aliment found");
    }
    res.status(200).json(aliment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllAliments = async (req, res) => {
  try {
    const aliments = await Aliment.find();
    if (aliments.length === 0) {
      return res.status(400).json("No aliments found");
    }
    res.status(200).json(aliments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createAliment = async (req, res) => {
  try {
    const { picture, alimentName, alimentCategorie, calories, carbohydrates, proteins, fats } = req.body;
    const newAliment = new Aliment({
      picture,
      alimentName,
      alimentCategorie,
      calories,
      carbohydrates,
      proteins,
      fats,
    });
    const savedAliment = await newAliment.save();
    res.status(201).json(savedAliment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAliment = async (req, res) => {
  try {
    const { id } = req.params;
    const { picture, alimentName, alimentCategorie, calories, carbohydrates, proteins, fats } = req.body;
    const updatedAliment = await Aliment.findByIdAndUpdate(
      id,
      { picture, alimentName, alimentCategorie, calories, carbohydrates, proteins, fats },
      { new: true }
    );
    if (updatedAliment === null) {
      return res.status(400).json("No aliment found");
    }
    res.status(200).json(updatedAliment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteAliment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAliment = await Aliment.findByIdAndDelete(id);
    if (deletedAliment === null) {
      return res.status(400).json("No aliment found");
    }
    res.status(200).json("Aliment deleted successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAlimentsByCategorie = async (req, res) => {
    try {
      const { categorie } = req.params;
      const aliments = await Aliment.find({ alimentCategorie: categorie });
      if (aliments.length === 0) {
        return res.status(400).json("No aliments found in the given category");
      }
      res.status(200).json(aliments);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  const getAlimentsByAlimentName = async (req, res) => {
    try {
      const { name } = req.params;
      const aliments = await Aliment.find({$or: [
        { alimentName: { $regex: `^${name}`, $options: "i" } }

      ],}
        
      );
      if (aliments.length === 0) {
        return res.status(400).json("No aliments found in the given name");
      }
      res.status(200).json(aliments);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

export default {
  getAlimentById,
  getAllAliments,
  createAliment,
  updateAliment,
  deleteAliment,
  getAlimentsByCategorie,
  getAlimentsByAlimentName,
};