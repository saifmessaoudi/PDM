import express from 'express';
import {Router} from 'express';
import pharmacyController from '../controllers/pharmacie.controller.js'; // Adjust the path based on your project structure

const router = Router();

// Define your pharmacy-related routes using the controller functions
router.get('/pharmacies', pharmacyController.getAllPharmacies);
router.get('/pharmacies/:id', pharmacyController.getPharmacieById);
router.post('/pharmacies', pharmacyController.addPharmacie);
router.put('/pharmacies/:id', pharmacyController.updatePharmacie);
router.delete('/pharmacies/:id', pharmacyController.deletePharmacie);
router.get('/pharmacies/search', pharmacyController.searchPharmaciesByName);
router.get('/pharmacies/night', pharmacyController.getNightPharmacies);
router.get('/pharmacies/day', pharmacyController.getDayPharmacies);

export default router;
