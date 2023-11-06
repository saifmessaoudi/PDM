import { Router } from "express";
import alimentController from "../controllers/aliment.controller.js";

const alimentRouter = Router();

alimentRouter.get("/", alimentController.getAllAliments);
alimentRouter.get("/:id", alimentController.getAlimentById);
alimentRouter.get("/categorie/:categorie", alimentController.getAlimentsByCategorie);
alimentRouter.post("/", alimentController.createAliment);
alimentRouter.put("/:id", alimentController.updateAliment);
alimentRouter.delete("/:id", alimentController.deleteAliment);
alimentRouter.get("/name/:name", alimentController.getAlimentsByAlimentName)

export default alimentRouter;