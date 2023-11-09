import mongoose from "mongoose";

const coursSchema = new mongoose.Schema({
  theme: { type: String, required: true },
  objectifs: { type: String, required: true },
  duree: { type: String, required: true },
  format: { type: String, required: true },
  formateur: { type: String, required: true },
  exercices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercice' }]
});

const Cours = mongoose.model('cours', coursSchema);

export default  Cours ;
