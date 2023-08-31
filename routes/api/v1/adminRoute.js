const express = require('express');
const adminController = require('../../../controller/api/v1/admin');

const router = express.Router();

router.post('/signUp',adminController.signUp);
router.get('/signIn',adminController.signIn);
router.get('/adminProfile/:id',adminController.adminProfile);
router.put('/updateAdmin/:id',adminController.updateProfile);
router.get('/appointmentList',adminController.appointmentsList);
router.get('/patientList',adminController.patientList);
router.get('/doctorList',adminController.doctorList);
router.get('/profile/:id',adminController.viewFullProfile);
router.get('/search',adminController.searchFilter);
router.delete('/remove/:id',adminController.removeDoctorPatient);
router.get('/total',adminController.total);
module.exports = router;