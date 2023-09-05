const express = require('express');
const appointmentController = require('../../../controller/api/v1/appointment');

const router = express.Router();
const validations = require('../../../validations/appointment');
const { validate } = require('express-validation');
router.post('/appointment/:patId',validate(validations.createAppointment),appointmentController.takeAppointment);

module.exports = router;