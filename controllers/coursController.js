import Cours from "../models/cours.model.js";


// Créer un nouveau cours
const createCours = async (req, res) => {
  try {
    const { theme, objectifs, duree, format, formateur, exercices } = req.body;

    const nouveauCours = new Cours({
      theme,
      objectifs,
      duree,
      format,
      formateur,
      exercices,
    });

    const coursCree = await nouveauCours.save();

    res.status(201).json(coursCree);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du cours' });
  }
};

// Récupérer tous les cours
const getAllCours = async (req, res) => {
  try {
    const cours = await Cours.find().populate('exercices');

    console.log(cours);

    res.status(200).json(cours);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la recuperation des cours' });
  }
};

// Récupérer un cours par son ID
const getCoursById = async (req, res) => {
  try {
    const cours = await Cours.findById(req.params.id);

    if (!cours) {
      return res.status(404).json({ message: 'Cours non trouve' });
    }

    res.json(cours);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la recuperation du cours' });
  }
};

// Mettre à jour un cours
const updateCours = async (req, res) => {
  try {
    const { theme, objectifs, duree, format, formateur } = req.body;

    const cours = await Cours.findByIdAndUpdate(
      req.params.id,
      {
        theme,
        objectifs,
        duree,
        format,
        formateur
      },
      { new: true }
    );

    if (!cours) {
      return res.status(404).json({ message: 'Cours non trouve' });
    }

    res.json(cours);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise a jour du cours' });
  }
};

// Supprimer un cours
const deleteCours = async (req, res) => {
  try {
    const cours = await Cours.findByIdAndRemove(req.params.id);

    if (!cours) {
      return res.status(404).json({ message: 'Cours non trouve' });
    }

    res.json({ message: 'Cours supprime avec succes' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du cours' });
  }
};

export default {
    createCours,
    getAllCours,
    getCoursById,
    updateCours,
    deleteCours
};