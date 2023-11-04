import { Router } from "express";
import usercontroller from "../controllers/user.controller.js";
import authenticated from "../middlewares/authenticated.middleware.js";


const userRouter = Router();

/**
 * @swagger
 * /user/clients:
 *   get:  
 *     summary: Get All Clients
 *     description: Get All Clients
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Clients
 *       401:
 *         description: Unauthorized, incorrect credentials
 */
userRouter.get("/clients" ,usercontroller.getAllClients);
userRouter.get("/medecins", authenticated ,usercontroller.getAllMedecins);
userRouter.get("/client/:id", authenticated ,usercontroller.getClientById);
userRouter.get("/medecin/:id", authenticated ,usercontroller.getMedecinById);
userRouter.post("/update/:id", authenticated ,usercontroller.updateUser);
userRouter.post("/addRemoveFavorite/:otherUserId", authenticated ,usercontroller.addRemoveFavorite);
userRouter.get("/search-user" ,authenticated,usercontroller.searchUser);
userRouter.get('/get-favorites',authenticated,usercontroller.getFavorites);

export default userRouter;