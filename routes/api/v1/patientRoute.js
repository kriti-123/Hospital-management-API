const express = require('express');
const patientController = require('../../../controller/api/v1/patient');

const router = express.Router();

router.post('/signUp',patientController.signUp);
router.get('/signIn',patientController.signIn);
router.get('/patientProfile/:id',patientController.patientProfile);
router.put('/updateAdmin',patientController.updateProfile);
router.post('/appointment/:id',patientController.takeAppointment);
router.post('/feedback',patientController.feedback);
module.exports = router;