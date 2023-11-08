import { Router } from "express";
import repasController from "../controllers/repas.controller.js";

const repasRouter = Router();

repasRouter.get("/", repasController.getAllRepas);
repasRouter.get("/:id", repasController.getRepasById);
repasRouter.post("/", repasController.addAlimentToRepas);
repasRouter.delete("/:id", repasController.deleteRepas);
repasRouter.get("/name/:name", repasController.getRepasByRepasName)

export default repasRouter;