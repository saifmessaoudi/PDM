import { Router } from "express";
import usercontroller from "../controllers/user.controller.js";
import authenticated from "../middlewares/authenticated.middleware.js";


const userRouter = Router();

/**
 * @swagger
 * /user/clients:
 *   get:  
 *     summary: Get All Clients
 *     security:
 *       - bearerAuth: []
 *     description: Get All Clients
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Clients
 *       401:
 *         description: Unauthorized, incorrect credentials
 */
userRouter.get("/clients" , authenticated,usercontroller.getAllClients);

/**
 * @swagger
 * /user/medecins:
 *   get:  
 *     summary: Get All Medecins
 *     security:
 *       - bearerAuth: []
 *     description: Get All Medecins
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Medecins
 *       401:
 *         description: Unauthorized, incorrect credentials
 */
userRouter.get("/medecins" ,authenticated,usercontroller.getAllMedecins);


/**
 * @swagger
 * /user/get-current-user:
 *   get:  
 *     summary: Get authenticated user
 *     security:
 *       - bearerAuth: []
 *     description: Get authnticated user
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User
 *       401:
 *         description: Unauthorized, incorrect credentials
 */
userRouter.get("/get-current-user" ,authenticated,usercontroller.getCurrentUser);

/**
 * @swagger
 * /user/client/{id}:
 *   get:
 *     summary: Get Client By Id
 *     description: Get Client By Id
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Client Id
 *     responses:
 *       200:
 *         description: Client
 *       401:
 *         description: Unauthorized, incorrect credentials
 */     
userRouter.get("/client/:id" ,usercontroller.getClientById);

/**
 * @swagger
 * /user/medecin/{id}:
 *   get:
 *     summary: Get Medecin By Id
 *     security:
 *      - bearerAuth: []
 *     description: Get Medecin By Id
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Medecin Id
 *     responses:
 *       200:   
 *         description: Medecin
 *       401:
 *         description: Unauthorized, incorrect credentials
 */ 
userRouter.get("/medecin/:id", authenticated ,usercontroller.getMedecinById);
userRouter.post("/update/:id", authenticated ,usercontroller.updateUser);
userRouter.post("/addRemoveFavorite/:otherUserId", authenticated ,usercontroller.addRemoveFavorite);

/**
 * @swagger
 * /user/search-user:
 *   get:
 *     summary: Search User
 *     security:
 *      - bearerAuth: []
 *     description: Search User
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Search Query
 *     responses:
 *       200:
 *         description: Users
 *       401:
 *         description: Unauthorized, incorrect credentials
 */
userRouter.get("/search-user" ,authenticated,usercontroller.searchUser);

/**
 * @swagger
 * /user/get-favorites:
 *  get:
 *    summary: Get Favorites
 *    security:
 *      - bearerAuth: []
 *    description: Get Favorites
 *    tags:
 *      - User
 *    responses:
 *      200:
 *        description: Favorites
 *      401:
 *        description: Unauthorized, incorrect credentials
 */
userRouter.get('/get-favorites',authenticated,usercontroller.getFavorites);

export default userRouter;