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
        if (compare) res.status(200).json({ message: "Authentication Successfull", })
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
        return res.status(200).json({ message: "successfully updated to databse", doc: doc });
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



/*  
1. Patient Home – Patient can view his profile
2. Current Appointment – Patient can view if he has some pending or approved appointment with a doctor
3. Bills History – Patient can view the bill history of appointments that have been completed
4. Treatment History – Patient can view the treatment history of appointments which have been completed
5. Take Appointment – Patient can view all the departments, 
   and then can select one dept. Then the doctors of that dept are shown. 
   Then patient selects one doctor and the doctor’s profile is then shown along with
   a ‘take appointment’ button. 
   When the button is clicked, the free slots of that particular doctor are shown.
   Patient selects a free slot of his choice and then sends request for that free slot to the doctor. The doctor will then approve/reject it.
6. Notifications – In this tab, a notification is shown whenever the doctor 
   accepts/rejects the requested appointment.
7. Feedback – After a appointment is completed, patient can give feedback 
   about that appointment by rating it from 1 – 5
8. A patient can request for only one appointment at a time 
   and will not be allowed to take more than one appointments until the last appointment has been completed.
*/



