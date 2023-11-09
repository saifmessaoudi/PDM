import Exercice from "../models/exercice.model.js";
import exercice from "../models/exercice.model.js";

const getExerciceById = async (req, res) => {
  try {
    const { id } = req.params;
    const exercice = await Exercice.findById(id);
    if (exercice === null) {
      return res.status(400).json("No exercice found");
    }
    res.status(200).json(exercice);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllExercies = async (req, res) => {
  try {
    const aliments = await Exercice.find();
    if (exercice.length === 0) {
      return res.status(400).json("No exercice found");
    }
    res.status(200).json(exercice);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const creatExercice    = async (req, res) => {
  try {
    const { picture, exercicetitle, exerciceCategorie, calories, description } = req.body;
    const newExercice = new Exercice({
      picture,
      exercicetitle,
      exerciceCategorie,
      calories,
      description,
    });
    const savedExercice = await newExercice.save();
    res.status(201).json(savedExercice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateExercice = async (req, res) => {
  try {
    const { id } = req.params;
    const { picture, exercicetitle, exerciceCategorie, calories, description } = req.body;
    const updatedExercice= await Exercice.findByIdAndUpdate(
      id,
      { picture, exercicetitle, exerciceCategorie, calories, descriptions },
      { new: true }
    );
    if (updateExercice === null) {
      return res.status(400).json("No exercice found");
    }
    res.status(200).json(updateExercice);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteExercice= async (req, res) => {
  const { id } = req.params;
  try {
    const deleteExercice = await Exercice.findByIdAndDelete(id);
    if (deletedExercice === null) {
      return res.status(400).json("No exercice found");
    }
    res.status(200).json("Exercice deleted successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getExerciceByCategorie = async (req, res) => {
    try {
      const { categorie } = req.params;
      const exercices = await Exercice.find({ exerciceCategorie: categorie });
      if (exercices.length === 0) {
        return res.status(400).json("No exercice found in the given category");
      }
      res.status(200).json(exercices);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  const getExercicesByExercicetitle = async (req, res) => {
    try {
      const { name } = req.params;
      const exercices = await Exercice.find({$or: [
        { exerciceName: { $regex: `^${name}`, $options: "i" } }

      ],}
        
      );
      if (exercice.length === 0) {
        return res.status(400).json("No exercices found in the given name");
      }
      res.status(200).json(exercices);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

export default {
  getExerciceById,
  getAllExercies,
  creatExercice,
  updateExercice,
  deleteExercice,
  getExerciceByCategorie,
  getExercicesByExercicetitle,
  
};