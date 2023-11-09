import { Router } from "express";
import reclamationController from "../controllers/reclamation.controller.js";

const reclamationRouter = Router();

reclamationRouter.get("/", reclamationController.getAllReclamations);
reclamationRouter.get("/:id", reclamationController.getReclamationById);
reclamationRouter.post("/", reclamationController.createReclamation);
reclamationRouter.put("/:id", reclamationController.updateReclamation);
reclamationRouter.delete("/:id", reclamationController.deleteReclamation);
reclamationRouter.get("/nom/:nom", reclamationController.getReclamationsBynom)

export default reclamationRouter;