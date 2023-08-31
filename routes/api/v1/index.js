const express = require('express');
const deptRoute = require('./deptRoute');
const adminRoute = require('./adminRoute');
const doctorRoute = require('./doctorRoute');
const patientRoute = require('./patientRoute');
const appointmentRoute = require('./appointmentRoute');
const router = express.Router();
router.use('/dept',deptRoute);
router.use('/admin',adminRoute);
router.use('/doctor',doctorRoute);
router.use('/patient',patientRoute);
router.use('/apointment',appointmentRoute);

module.exports =  router;