const Admin = require('../../../models/admin');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Appoinment = require('../../../models/appointment');
const Doctor = require('../../../models/doctor');
const Patient = require('../../../models/patient');
const AppError = require('../../../utils/appError');
const { takeAppointment } = require('./appointment');
/*Admin signUps controller*/
module.exports.signUp = async function (req, res, next) {
    try {
        console.log(req.body);
        if (req.body.password != req.body.confirmPassword) {
            return res.status(401).send({ error: true, msg: 'Password does not match' });
        }
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            const bcryptpass = await bcryptjs.genSalt(10);
            const hashpass = await bcryptjs.hash(req.body.password, bcryptpass);
            const hashCpass = await bcryptjs.hash(req.body.confirmPassword, bcryptpass);
            req.body.password = hashpass;
            req.body.confirmPassword = hashCpass;
            const admin = await Admin.create(req.body);
            if (admin) {
                return res.status(200).json({ message: "successfully inserted to databse", admin: admin });
            }
            throw new AppError('error occured during creation', 401)
            // throw new Error({statusCode:404,message:'error occured during creation'});
            // return res.status(401).send({ error: true, msg: 'error occured during creation' });
        }
        throw new AppError('error user id already registered', 403)
        // throw new Error({statusCode:401,message:'error occured during creation'});
        // return res.status(401).send({ error: true, msg: 'error occured during creation' });
    }
    catch (e) {
        next(e);
    }
}
/*Admin signin controller*/
module.exports.signIn = async function (req, res, next) {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (admin === null) {
            throw new Error('user not found');
            // res.status(401).json({ message: "user not found" })
        }
        else {
            const compare = await bcryptjs.compare(req.body.password, admin.password);
            const token = jwt.sign({ admin: admin._id }, "kritishreehellop", { expiresIn: '100000' });
            if (compare) res.status(200).json({ message: "Authentication Successfull", token: token })
            else throw new AppError('user id and password getting wrong', 401)
            // else res.status(404).json({ message: "user id and password getting wrong" });
        }
    }
    catch (e) {
        next(e);
    }
}
/* update profile */
module.exports.updateProfile = async function (req, res, next) {
    try {
        const adminId = req.params.id;
        const updateData = req.body;
        const data = await Admin.findByIdAndUpdate(adminId, updateData);
        if (data) {
            return res.status(200).json({ message: "successfully updated to databse", adm: data });
        }
        // else return res.status(401).json({ error: true, msg: 'user not exist' });
        else throw new AppError('user not exist', 401);
    }
    catch (e) {
        next(e);
    }
}
/* admin profile */
module.exports.adminProfile = async function (req, res) {
    try {
        const admin = await Admin.findById(req.params.id);
        if (admin) {
            res.status(200).json({ message: "user profile", admin: admin });
        }
        else {
            throw new AppError('login first', 404);
            // res.status(404).json({ message: "login first" });
        }
    } catch (e) {
        next(e);
    }
}
/*  find the all appintments  */
module.exports.appointmentsList = async function (req, res, next) {
    try {
        const appoint = await Appoinment.find();
        if (appoint) {
            res.status(200).json({ message: "succesfully got the data", appoint: appoint });
        }
        else {
            throw new AppError('error caught', 404);
        }
    }
    catch (e) {
        next(e);
    }
}
/* find all the patient list */
module.exports.patientList = async function (req, res, next) {
    try {
        const pat = await Patient.find({}, 'name');
        if (appoint) {
            res.status(200).json({ message: "succesfully got the data", pat: pat });
        }
        else {
            throw new AppError('error caught', 404)
        }
    }
    catch (e) {
        next(e);
    }
}
/* find all the doctors which have registered */
module.exports.doctorList = async function (req, res, next) {
    try {
        const doct = await Doctor.find({}, 'name');
        if (doct) {
            res.status(200).json({ message: "succesfully got the data", doctor: doct });
        }
        else throw new AppError('errror occured', 404);
    }
    catch (e) {
        next(e);
    }
}

/* common profile controller for viewing the complte profile of doctor and patient */
module.exports.viewFullProfile = async function (req, res, next) {
    try {
        const id = req.params.id;
        const data = await Doctor.findById(id) || await Patient.findById(id);
        if (await Doctor.findById(id) || await Patient.findById(id)) {
            res.status(200).json({ message: "successfull got the complete data", data: data });
        }
        else throw new AppError('errror occured', 404);
    }
    catch (e) {
        next(e)
    }
}
/* search by company name */
module.exports.searchFilter = async function (req, res, next) {
    try {
        const empName = req.body.name;
        console.log(empName);
        const data = await Doctor.findOne({ name: empName });
        console.log(data);
        if (data) {
            res.status(200).json({ success: true, list: data });
        }
        else {
            throw new AppError('not found', 404);
        }
    } catch (e) {
        next(e);
    }
}
/* admin remove the doctor or */
module.exports.removeDoctorPatient = async function (req, res) {
    try {
        const id = req.params.id;
        if (await Doctor.findByIdAndDelete(id) || await Patient.findByIdAndDelete(id)) {
            res.status(200).json({ message: "successfully removed " });
        }
        else throw new AppError('error caught', 404);

    }
    catch (e) {
        next(e);
    }
}
/*  find the total  */
module.exports.total = async function (req, res) {
    const tot = await Patient.countDocuments();
    const totDoc = await Doctor.countDocuments();
    res.status(200).json({ message: "succ", total: tot, totDoc: totDoc });
}

