import Magazine from "../models/magazine.model.js";

const getMagazineById = async (req, res) => {
  try {
    const { id } = req.params;
    const magazine = await Magazine.findById(id);
    if (magazine === null) {
      return res.status(400).json("Magazines introuvalbles");
    }
    res.status(200).json(magazine);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllMagazines = async (req, res) => {
  try {
    const magazines = await Magazine.find();
    if (magazines.length === 0) {
      return res.status(400).json("Magazine introuvalble");
    }
    res.status(200).json(magazines);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createMagazine = async (req, res) => {
  try {
    const newMagazine = new Magazine(req.body);
    await newMagazine.save();
    res.status(201).json(newMagazine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const deleteMagazine = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMagazine = await Magazine.findByIdAndDelete(id);
    if (deletedMagazine === null) {
      return res.status(400).json("magazines introuvables");
    }
    res.status(200).json("Magazine deleted successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};

  const getMagazinesBynom = async (req, res) => {
    try {
      const  name  = req.params.nom;      
      const magazine = await Magazine.find({$or: [
        { nom: { $regex: `^${name}`, $options: "i" } }

      ],}
      );
      if (magazine.length === 0) {
         res.status(400).json("No Magazine found in the given name");
      }
      res.status(200).json(magazine);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

export default {
  getMagazineById,
  getAllMagazines,
  createMagazine,
  deleteMagazine,
  getMagazinesBynom,
};