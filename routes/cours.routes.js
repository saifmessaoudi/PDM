import { Router } from "express";
import coursController from "../controllers/coursController.js";

const coursrouter = Router();

// Routes pour les cours
coursrouter.post('/add-cours', coursController.createCours);
coursrouter.get('/list-cours', coursController.getAllCours);
coursrouter.get('/one-cours/:id', coursController.getCoursById);
coursrouter.put('/edit-cours/:id', coursController.updateCours);
coursrouter.delete('/delete-cours/:id', coursController.deleteCours);

export default  coursrouter;
