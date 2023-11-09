import mongoose from "mongoose";

const exerciceSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  duree: { type: String, required: true },
  niveau_difficulte: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, required: true }
});

const Exercice = mongoose.model('exercice', exerciceSchema);

export default  Exercice ;
