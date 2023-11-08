import { Router } from "express";
import exerciceController from "../controllers/exercice.controller.js";

const exerciceRouter = Router();

exerciceRouter.get("/", exerciceController.getAllExercies);
exerciceRouter.get("/:id", exerciceController.getExerciceById);
exerciceRouter.get("/categorie/:categorie", exerciceController.getExerciceByCategorie);
exerciceRouter.post("/", exerciceController.creatExercice);
exerciceRouter.put("/:id", exerciceController.updateExercice);
exerciceRouter.delete("/:id", exerciceController.deleteExercice);
exerciceRouter.get("/title/:title", exerciceController.getExercicesByExercicetitle)

export default exerciceRouter;