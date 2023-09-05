const express = require('express');
const adminController = require('../../../controller/api/v1/admin');

const router = express.Router();
const validations = require('../../../validations/admin');
const { validate } = require('express-validation');


router.post('/signUp',validate(validations.createOrUpdateDetail),adminController.signUp);
router.post('/signIn',validate(validations.signIn),adminController.signIn);
router.get('/adminProfile/:id',adminController.adminProfile);
router.put('/updateAdmin/:id',validate(validations.createOrUpdateDetail),adminController.updateProfile);
router.get('/appointmentList',adminController.appointmentsList);
router.get('/patientList',adminController.patientList);
router.get('/doctorList',adminController.doctorList);
router.get('/profile/:id',adminController.viewFullProfile);
router.get('/search',validate(validations.search),adminController.searchFilter);
router.delete('/remove/:id',adminController.removeDoctorPatient);
router.get('/total',adminController.total);
module.exports = router;