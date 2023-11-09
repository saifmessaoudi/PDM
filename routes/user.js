import express  from "express";
import { create, deleteUser, getAll, getOne, update } from "../controllers/user.js";



const router = express.Router()

router.post("/create", create)
router.get("/get", getAll)
router.get("/get/:id", getOne)

router.put("/update/:id", update)

router.delete("/delete/:id", deleteUser)




export default router