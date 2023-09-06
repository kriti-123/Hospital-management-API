const Patient = require('../../../models/patient');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Appointment = require('../../../models/appointment');
const BillHistory = require('../../../models/billHistory');
const Noti = require('../../../models/notification');
const Feedback = require('../../../models/feedback')
/* patient signUps controller */
module.exports.signUp = async function (req, res) {
    console.log(req.body);
    if (req.body.password != req.body.confirmPassword) {
        return res.status(401).send({ error: true, msg: 'Password does not match' });
    }
    const patient = await Patient.findOne({ email: req.body.email });
    if (!patient) {
        const bcryptpass = await bcryptjs.genSalt(10);
        const hashpass = await bcryptjs.hash(req.body.password, bcryptpass);
        const hashCpass = await bcryptjs.hash(req.body.confirmPassword, bcryptpass);
        req.body.password = hashpass;
        req.body.confirmPassword = hashCpass;
        const pat = await Patient.create(req.body);
        if (pat) {
            return res.status(200).json({ message: "successfully inserted to databse", pat: pat });
        }
        return res.status(401).json({ error: true, msg: 'error occured during creation' });
    }
    return res.status(401).send({ error: true, msg: 'error occured during creation' });

}
/*patient signin controller*/
module.exports.signIn = async function (req, res) {
    const patient = await Patient.findOne({ email: req.body.email });
    if (patient === null) {
        res.status(401).json({ message: "patient not found" })
    }
    else {
        const compare = await bcryptjs.compare(req.body.password, doctor.password);
        if (compare){
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1d' });
            res.status(200).json({ message: "Authentication Successfull",token:token })
        }
        else res.status(404).json({ message: "user id and password getting wrong" });
    }
}
/* doctor profile */
module.exports.patientProfile = async function (req, res) {
    const patient = await Patient.findById(req.params.id);
    if (patient) {
        res.status(200).json({ message: "patient profile", patient: patient });
    }
    else {
        res.status(404).json({ message: "login first" });
    }
}
/* update profile */
module.exports.updateProfile = async function (req, res) {
    const patId = req.params.id;
    const updateData = req.body;
    const data = await Patient.findByIdAndUpdate(patId, updateData);
    if (data) {
        return res.status(200).json({ message: "successfully updated to databse", doc: data });
    }
    return res.status(401).json({ error: true, msg: 'error occured during updation' });

}
module.exports.billHistory = async function (req, res) {
    const patId = req.params.id;
    const data = await BillHistory.findById(patId);
    if (data) res.status(200).json({ message: "deatils of patient", data: data });
    else res.status(404).json({ message: "error in finding history" });
}
/* take appointment */
module.exports.takeAppointment = async function (req, res) {

    const patId = req.params.id;
    const f = await Appointment.findById(patId);
    // console.log(f)
    if (f) res.status(200).json({ message: "patient appointment already exist" })
    
    else {
        Appointment.pat_id = req.params.id;
        console.log(Appointment.pat_id);
        const appo = await Appointment.create(req.body);
        if (appo) {
            res.status(200).json({ message: "successfully inserted", data: appo });
        }
        else {
            res.status(400).json({ message: "error caught" });
        }

    }
}
/* show notification */
module.exports.notification = async function (req, res) {
    const getNoti = await Appointment.findById(req.params.id);
    if (getNoti.appinmentStatus) {
        if (getNoti.appinmentStatus) res.status(200).json({ message: "got the apppointment", data: get });
        else res.status(404).json({ message: "appointment is pending" });
    }
    else res.status(404).json({ message: "error occured" });
}
/* feedback */
module.exports.feedback = async function(req,res){
    const feed = await Feedback.create(req.body);
    if(feed) res.status(200).json({ message:"successfully sent the feedback",data:feed });
    else res.status(404).json({ message:"error in sending feedback" });
}





