import { Router } from "express";
import usercontroller from "../controllers/user.controller.js";
import authenticated from "../middlewares/authenticated.middleware.js";


const userRouter = Router();

userRouter.get("/clients", authenticated ,usercontroller.getAllClients);
userRouter.get("/medecins", authenticated ,usercontroller.getAllMedecins);
userRouter.get("/client/:id", authenticated ,usercontroller.getClientById);
userRouter.get("/medecin/:id", authenticated ,usercontroller.getMedecinById);
userRouter.post("/update/:id", authenticated ,usercontroller.updateUser);
userRouter.post("/addRemoveFavorite/:otherUserId", authenticated ,usercontroller.addRemoveFavorite);
userRouter.get("/search-user" ,authenticated,usercontroller.searchUser);
userRouter.get('/get-favorites',authenticated,usercontroller.getFavorites);

export default userRouter;