import { Router } from "express";
import exerciceController from "../controllers/exerciceController.js";

const exercicesrouter = Router();

// Routes pour les exercices
exercicesrouter.post('/exercices', exerciceController.createExercice);
exercicesrouter.get('/exercices', exerciceController.getAllExercices);
exercicesrouter.get('/exercices/:id', exerciceController.getExerciceById);
exercicesrouter.post('/exercices/:id', exerciceController.updateExercice);
exercicesrouter.delete('/exercices/:id', exerciceController.deleteExercice);

export default  exercicesrouter;
