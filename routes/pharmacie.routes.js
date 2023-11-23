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
router.get('/search/:name', pharmacyController.searchPharmaciesByName);
router.get('/getPharmacieNight', pharmacyController.getNightPharmacies);
router.get('/getPharmacieJour', pharmacyController.getDayPharmacies);

export default router;

