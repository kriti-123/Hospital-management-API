const express = require('express');
const patientController = require('../../../controller/api/v1/patient');

const router = express.Router();
const validation = require('../../../validations/patient');
const appovalidations = require('../../../validations/appointment')
const { validate } = require('express-validation');
router.post('/signUp',validate(validation.createOrUpdateDetail),patientController.signUp);
router.get('/signIn',patientController.signIn);
router.get('/patientProfile/:id',patientController.patientProfile);
router.put('/update/:id',validate(validation.update),patientController.patientProfile);
router.post('/appointment/:id',validate(appovalidations.createAppointment),patientController.takeAppointment);
router.post('/feedback',patientController.feedback);
module.exports = router;