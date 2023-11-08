import Repas from "../models/repas.model.js";

const getRepasById = async (req, res) => {
    try {
      const { id } = req.params;
      const repas = await Repas.findById(id);
      if (repas === null) {
        return res.status(400).json("No repas found");
      }
      res.status(200).json(repas);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  const getAllRepas = async (req, res) => {
    try {
      const repas = await Repas.find();
      if (repas.length === 0) {
        return res.status(400).json("No repas found");
      }
      res.status(200).json(repas);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  const addAlimentToRepas = async (req, res) => {
    try {
        const {title , description , aliments}=req.body;
            const repas = new Repas({
               repasName: title,
               repasDescription:  description,
                aliments,
            });
            await repas.save();
            res.status(200).json("Repas added!");
        }catch(error){
        res.status(404).json({ message: error.message });
    }
};

const deleteRepas = async (req, res) => {
    const  id  = req.params.id;
    try {
      const deletedRepas = await Repas.findByIdAndDelete({_id:id});
      if (deletedRepas === null) {
        return res.status(400).json("No repas found");
      }
      res.status(200).json("Repas deleted successfully");
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

const getRepasByRepasName = async (req, res) => {
    try {
      const { name } = req.params;
      const repass = await Repas.find({$or: [
        { repasName: { $regex: `^${name}`, $options: "i" } }

      ],}
        
      );
      if (repas.length === 0) {
        return res.status(400).json("No repas found in the given name");
      }
      res.status(200).json(repas);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export default {
    getRepasById,
    getAllRepas,
    addAlimentToRepas,
    deleteRepas,
    getRepasByRepasName,
  };


