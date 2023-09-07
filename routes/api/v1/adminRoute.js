const express = require("express");
const adminController = require("../../../controller/api/v1/admin");

const router = express.Router();
const validations = require("../../../validations/admin");
const { validate } = require("express-validation");
const auth = require("../../../middleware/auth");

router.post("/signUp", adminController.signUp);
router.post("/signIn", adminController.signIn);
router.get("/:id", auth.authenticate, adminController.adminProfile);
router.put("/:id", auth.authenticate, adminController.updateProfile);
router.get(
  "/appointmentList",
  auth.authenticate,
  adminController.appointmentsList
);
router.get("/patientList", auth.authenticate, adminController.patientList);
router.get("/doctorList", auth.authenticate, adminController.doctorList);
router.get("/profile/:id", auth.authenticate, adminController.viewFullProfile);
router.get(
  "/search",
  validate(validations.search),
  adminController.searchFilter
);
router.delete("/:id", auth.authenticate, adminController.removeDoctorPatient);
router.get("/total", adminController.total);
module.exports = router;
