import { Router } from "express";
import exerciceController from "../controllers/exerciceController.js";

const exercicesrouter = Router();

// Routes pour les exercices
exercicesrouter.post('/add-exercice', exerciceController.createExercice);
exercicesrouter.get('/list-exercice', exerciceController.getAllExercices);
exercicesrouter.get('/one-exercice/:id', exerciceController.getExerciceById);
exercicesrouter.post('/edit-exercice/:id', exerciceController.updateExercice);
exercicesrouter.delete('/delete-exercice/:id', exerciceController.deleteExercice);

export default  exercicesrouter;
