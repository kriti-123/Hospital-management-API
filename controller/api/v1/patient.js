const Patient = require("../../../models/patient");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Appointment = require("../../../models/appointment");
const BillHistory = require("../../../models/billHistory");
const Noti = require("../../../models/notification");
const Feedback = require("../../../models/feedback");
const AppError = require("../../../utils/appError");
/* patient signUps controller */
module.exports.signUp = async function (req, res, next) {
  try {
    console.log(req.body);
    if (req.body.password != req.body.confirmPassword) {
      return res
        .status(401)
        .send({ error: true, msg: "Password does not match" });
    }
    const patient = await Patient.findOne({ email: req.body.email });
    if (!patient) {
      const bcryptpass = await bcryptjs.genSalt(10);
      const hashpass = await bcryptjs.hash(req.body.password, bcryptpass);
      const hashCpass = await bcryptjs.hash(
        req.body.confirmPassword,
        bcryptpass
      );
      req.body.password = hashpass;
      req.body.confirmPassword = hashCpass;
      const pat = await Patient.create(req.body);
      if (pat) {
        return res
          .status(200)
          .json({ message: "successfully inserted to databse", pat: pat });
      }
      throw new AppError("error occure during creation", 401);
    } else throw new AppError("patient already registered", 401);
  } catch (e) {
    next(e);
  }
};
/*patient signin controller*/
module.exports.signIn = async function (req, res, next) {
  try {
    const patient = await Patient.findOne({ email: req.body.email });
    if (patient === null) {
      res.status(401).json({ message: "patient not found" });
    } else {
      const compare = await bcryptjs.compare(
        req.body.password,
        doctor.password
      );
      if (compare) {
        const token = jwt.sign(
          { userId: user.id },
          process.env.SECRET,
          process.env.EXPIRE_IN
        );
        res
          .status(200)
          .json({ message: "Authentication Successfull", token: token });
      } else throw new AppError("user id and password getting wrong", 404);
    }
  } catch (e) {
    next(e);
  }
};
/* doctor profile */
module.exports.patientProfile = async function (req, res, next) {
  try {
    const patient = await Patient.findById(req.params.id);
    if (patient) {
      res.status(200).json({ message: "patient profile", patient: patient });
    } else {
      throw new AppError("login first", 401);
    }
  } catch (e) {
    next(e);
  }
};
/* update profile */
module.exports.updateProfile = async function (req, res, next) {
  try {
    const patId = req.params.id;
    const updateData = req.body;
    const data = await Patient.findByIdAndUpdate(patId, updateData);
    if (data) {
      return res
        .status(200)
        .json({ message: "successfully updated to databse", doc: data });
    } else throw new AppError("error occured during updation", 401);
  } catch (e) {
    next(e);
  }
};
module.exports.billHistory = async function (req, res, next) {
  try {
    const patId = req.params.id;
    const data = await BillHistory.findById(patId);
    if (data)
      res.status(200).json({ message: "deatils of patient", data: data });
    else throw new AppError("error caught finding the history", 401);
  } catch (e) {
    next(e);
  }
};
/* take appointment */
module.exports.takeAppointment = async function (req, res, next) {
  try {
    const patId = req.params.id;
    const f = await Appointment.findById(patId);
    // console.log(f)
    if (f)
      res.status(401).json({ message: "patient appointment already exist" });
    else {
      Appointment.pat_id = req.params.id;
      console.log(Appointment.pat_id);
      const appo = await Appointment.create(req.body);
      if (appo) {
        res.status(200).json({ message: "successfully inserted", data: appo });
      } else {
        throw new AppError("error caught", 401);
      }
    }
  } catch (e) {
    next(e);
  }
};
/* show notification */
module.exports.notification = async function (req, res, next) {
  try {
    const getNoti = await Appointment.findById(req.params.id);
    if (getNoti.appinmentStatus) {
      if (getNoti.appinmentStatus)
        res.status(200).json({ message: "got the apppointment", data: get });
      else throw new AppError("appointment is pending", 401);
    } else throw new AppError("error occured", 401);
  } catch (e) {
    next(e);
  }
};
/* feedback */
module.exports.feedback = async function (req, res, next) {
  try {
    const feed = await Feedback.create(req.body);
    if (feed)
      res
        .status(200)
        .json({ message: "successfully sent the feedback", data: feed });
    else throw new AppError("error in sending feedback", 401);
  } catch (e) {
    next(e);
  }
};
