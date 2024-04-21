const express = require('express');
const router = express.Router();
const controller = require('./medicalConditionController');

// Route to retrieve all medical conditions
router.get('/conditions', controller.getAllMedicalConditions);

// Route to retrieve details of a specific medical condition
router.get('/conditions/:conditionId', controller.getMedicalConditionDetails);

module.exports = router;
