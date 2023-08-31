const express = require('express');
const doctorController = require('../../../controller/api/v1/doctor');

const router = express.Router();

router.post('/signUp',doctorController.signUp);
router.get('/signIn',doctorController.signIn);
router.get('/appointments/:id',doctorController.ListAppointments);
router.post('/bill/:patId',doctorController.bill);
router.put('/update/:id',doctorController.historyUpdate);
router.get('/history/:id',doctorController.patientHistory);
module.exports = router;