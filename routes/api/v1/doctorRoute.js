const express = require('express');
const doctorController = require('../../../controller/api/v1/doctor');

const router = express.Router();
const validations = require('../../../validations/doctor');
const { validate } = require('express-validation');

router.post('/signUp',validate(validations.createOrUpdateDetail),doctorController.signUp);
router.get('/signIn',doctorController.signIn);
router.get('/appointments/:id',doctorController.ListAppointments);
router.post('/bill/:patId',doctorController.bill);
router.put('/update/:id',validate(validations.createOrUpdateDetail),doctorController.historyUpdate);
router.get('/history/:id',doctorController.patientHistory);
module.exports = router;