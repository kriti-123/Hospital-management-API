const express = require('express');
const adminController = require('../../../controller/api/v1/admin');

const router = express.Router();
const validations = require('../../../validations/admin');
const { validate } = require('express-validation');
const auth = require('../../../middleware/auth')

router.post('/signUp',adminController.signUp);
router.post('/signIn',auth.authenticate,adminController.signIn);
router.get('/:id',adminController.adminProfile);
router.put('/:id',adminController.updateProfile);
router.get('/appointmentList',adminController.appointmentsList);
router.get('/patientList',adminController.patientList);
router.get('/doctorList',adminController.doctorList);
router.get('/profile/:id',adminController.viewFullProfile);
router.get('/search',validate(validations.search),adminController.searchFilter);
router.delete('/:id',adminController.removeDoctorPatient);
router.get('/total',adminController.total);
module.exports = router;