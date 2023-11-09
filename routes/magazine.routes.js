import { Router } from "express";
import magazineController from "../controllers/magazine.controller.js";

const magazineRouter = Router();

magazineRouter.get("/*", magazineController.getAllMagazines);
magazineRouter.get("/:id*", magazineController.getMagazineById);
magazineRouter.post("/*", magazineController.createMagazine);
magazineRouter.delete("/:id*", magazineController.deleteMagazine);
magazineRouter.get("/nom/:nom*", magazineController.getMagazinesBynom)

export default magazineRouter;