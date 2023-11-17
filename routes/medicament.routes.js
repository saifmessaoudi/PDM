import express from 'express';
import {Router} from 'express';
import medicamentController from '../controllers/medicament.controller.js'; // Adjust the path based on your project structure

const router = Router();

// Define your pharmacy-related routes using the controller functions
router.get('/medicaments', medicamentController.getAllMedicaments);
router.get('/medicaments/:id', medicamentController.getMedicamentById);
router.post('/add', medicamentController.addMedicament);
router.delete('/medicaments/:id', medicamentController.deleteMedicament);
router.get('/getBiologique', medicamentController.getBiologique);
router.get('/getDermatologique', medicamentController.getDermatologique);


export default router;
