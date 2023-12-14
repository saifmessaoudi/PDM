import Exercice from "../models/exercice.model.js";
import Cours from "../models/cours.model.js";
// Créer un nouvel exercice
// const createExercice = async (req, res) => {
//   try {
//     const { nom, description, duree, niveau_difficulte, image, date } = req.body;

//     const nouvelExercice = new Exercice({
//       nom,
//       description,
//       duree,
//       niveau_difficulte,
//       image,
//       date
//     });

//     const exerciceCree = await nouvelExercice.save();

//     res.status(201).json(exerciceCree);
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur lors de la creation de lexercice' });
//   }
// };

const createExercice = async (req, res) => {
  try {
    const {
      nom,
      description,
      duree,
      niveau_difficulte,
      image,
      date,
      courseId,
    } = req.body;

    // Create a new exercise
    const nouvelExercice = new Exercice({
      nom,
      description,
      duree,
      niveau_difficulte,
      image,
      date,
    });

    // Save the exercise
    const exerciceCree = await nouvelExercice.save();

    // Find the course by courseId and push the exercise into the exercices array
    const cours = await Cours.findById(courseId);
    if (!cours) {
      return res.status(404).json({ error: "Course not found" });
    }

    cours.exercices.push(exerciceCree._id);
    await cours.save();

    res.status(201).json(exerciceCree);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la creation de l'exercice" });
  }
};
// Récupérer tous les exercices
const getAllExercices = async (req, res) => {
  try {
    const exercices = await Exercice.find();

    res.json(exercices);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Récupérer un exercice par son ID
const getExerciceById = async (req, res) => {
  try {
    const exercice = await Exercice.findById(req.params.id);    

    if (!exercice) {
      return res.status(404).json({ message: 'Exercice non trouve' });
    }

    res.json(exercice);
  } catch (error) {
    res.status(500).json({ error: 'Erreurlors de la recuperation de lexercice' });
  }
};

// Mettre à jour un exercice
const updateExercice = async (req, res) => {
  try {
    const { nom, description, duree, niveau_difficulte, image, date } = req.body;

    const exercice = await Exercice.findByIdAndUpdate(
      req.params.id,
      {
        nom,
        description,
        duree,
        niveau_difficulte,
        image,
        date
      },
      { new: true }
    );

    if (!exercice) {
      return res.status(404).json({ message: 'Exercice non trouve' });
    }

    res.json(exercice);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise a jour de lexercice' });
  }
};

// Supprimer un exercice
const deleteExercice = async (req, res) => {
  try {
    const exercice = await Exercice.findByIdAndRemove(req.params.id);

    if (!exercice) {
      return res.status(404).json({ message: 'Exercice non trouve' });
    }

    res.json({ message: 'Exercice supprime avec succes' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de lexercice' });
  }
};



export default {
    createExercice,
    getAllExercices,
    getExerciceById,
    updateExercice,
    deleteExercice
};