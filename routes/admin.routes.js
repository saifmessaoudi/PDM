import { Router} from "express";
import isAdminAuthenticated from "../middlewares/isAdminAuthenticated.middlewares.js";
import adminController from "../controllers/admin.controller.js";


const adminRouter = Router();



adminRouter.get("/users", isAdminAuthenticated ,adminController.getAllUsers);
adminRouter.get("/user/:id", isAdminAuthenticated ,adminController.getUserById);
adminRouter.get("/search-user" ,isAdminAuthenticated,adminController.searchUser);

adminRouter.post("/ban/:id", isAdminAuthenticated , adminController.banUser);
adminRouter.post("/unban/:id", isAdminAuthenticated , adminController.unbanUser);
adminRouter.delete("/delete/:id", isAdminAuthenticated , adminController.deleteUser);


export default adminRouter;