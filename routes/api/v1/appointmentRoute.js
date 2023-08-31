const express = require('express');
const appointmentController = require('../../../controller/api/v1/appointment');

const router = express.Router();

router.post('/appointment/:patId',appointmentController.takeAppointment);

module.exports = router;