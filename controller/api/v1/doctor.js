const Doctor = require("../../../models/doctor");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Appointment = require("../../../models/appointment");
const BillHistory = require("../../../models/billHistory");
const AppError = require("../../../utils/appError");
/* doctor signUps controller */
module.exports.signUp = async function (req, res, next) {
  try {
    console.log(req.body);
    if (req.body.password != req.body.confirmPassword) {
      return res
        .status(401)
        .send({ error: true, msg: "Password does not match" });
    }
    const doctor = await Doctor.findOne({ email: req.body.email });
    if (!doctor) {
      const bcryptpass = await bcryptjs.genSalt(10);
      const hashpass = await bcryptjs.hash(req.body.password, bcryptpass);
      const hashCpass = await bcryptjs.hash(
        req.body.confirmPassword,
        bcryptpass
      );
      req.body.password = hashpass;
      req.body.confirmPassword = hashCpass;
      const doc = await Doctor.create(req.body);
      if (doc) {
        return res
          .status(200)
          .json({ message: "successfully inserted to databse", doc: doc });
      } else throw new AppError("error caught", 404);
      // return res.status(401).json({ error: true, msg: 'error occured during creation' });
    } else throw new AppError("doctor already registered", 404);
    // return res.status(401).send({ error: true, msg: 'error occured during creation' });
  } catch (e) {
    next(e);
  }
};
/*doctor signin controller*/
module.exports.signIn = async function (req, res, next) {
  try {
    const doctor = await Doctor.findOne({ email: req.body.email });
    if (doctor === null) {
      res.status(401).json({ message: "user not found" });
    } else {
      const compare = await bcryptjs.compare(
        req.body.password,
        doctor.password
      );
      if (compare) {
        const token = jwt.sign({ docId: doctor.id }, process.env.SECRET, {
          expiresIn: "1h",
        });
        res
          .status(200)
          .json({ message: "Authentication Successfull", token: token });
      } else throw new AppError("id and pass getting wrong", 404);
      // res.status(404).json({ message: "user id and password getting wrong" });
    }
  } catch (e) {
    next(e);
  }
};
/* doctor profile */
module.exports.doctorProfile = async function (req, res, next) {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor) {
      res.status(200).json({ message: "user profile", doctor: doctor });
    } else {
      throw new AppError("login first", 404);
    }
  } catch (e) {
    next(e);
  }
};
/* update profile */
module.exports.updateProfile = async function (req, res, next) {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor) {
      const doc = Doctor.updateOne(req.body);
      if (doc) {
        return res
          .status(200)
          .json({ message: "successfully updated to databse", doc: doc });
      } else throw new AppError("error caught during updation", 404);
    } else throw new AppError("user does't exist", 404);
  } catch (e) {
    next(e);
  }
};
/* doctor appointments */
module.exports.ListAppointments = async function (req, res, next) {
  try {
    const id = req.params.id;
    const pat = await Appointment.find({ doctor_id: id });
    if (pat) {
      res.status(200).json({ message: "got the appointments", data: pat });
    } else throw new AppError("error caught", 404);
  } catch (e) {
    next(e);
  }
};
/* approved or reject patient appointment */
module.exports.notification = async function (req, res, next) {
  try {
    const id = req.params.id;
    const updatestatus = req.body;
    const data = await Appointment.findByIdAndUpdate(id, updatestatus);
    if (data)
      res.status(200).json({ message: "sent notification", data: data });
    else throw new AppError("error caught", 404);
  } catch (e) {
    next(e);
  }
};
/* generate the bill */
module.exports.bill = async function (req, res, next) {
  try {
    const patId = req.params.patId;
    req.body.pat_id = patId;
    const patBill = await BillHistory.create(req.body);
    if (patBill) {
      res
        .status(200)
        .json({ message: "successfully generated the bill", data: patBill });
    } else throw new AppError("error caught", 404);
  } catch (e) {
    next(e);
  }
};
/* generate the prescription and progress report */
module.exports.historyUpdate = async function (req, res, next) {
  try {
    const patId = req.params.id;
    const updateData = req.body;
    const data = await BillHistory.findByIdAndUpdate(patId, updateData);
    if (data) {
      res.status(200).json({
        message: "successfully updated his progress report and prescription",
      });
    } else throw new AppError("error in updating the bill", 404);
  } catch (e) {
    next(e);
  }
};
module.exports.patientHistory = async function (req, res, next) {
  try {
    const patHistory = await BillHistory.findById(req.params.id);
    if (patHistory)
      res.status(200).json({ message: "got the history", data: patHistory });
    else throw new AppError("error in getting the details", 404);
  } catch (e) {
    next(e);
  }
};
