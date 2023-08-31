const Doctor = require('../../../models/doctor');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Appointment = require('../../../models/appointment');
const BillHistory = require('../../../models/billHistory');
/* doctor signUps controller */
module.exports.signUp = async function (req, res) {
    console.log(req.body);
    if (req.body.password != req.body.confirmPassword) {
        return res.status(401).send({ error: true, msg: 'Password does not match' });
    }
      const doctor = await Doctor.findOne({ email: req.body.email });
        if (!doctor) {
            const bcryptpass = await bcryptjs.genSalt(10);
            const hashpass = await bcryptjs.hash(req.body.password,bcryptpass);
            const hashCpass = await bcryptjs.hash(req.body.confirmPassword,bcryptpass);
            req.body.password = hashpass;
            req.body.confirmPassword = hashCpass;
            const doc = await Doctor.create(req.body);
            if(doc){
               return res.status(200).json({ message: "successfully inserted to databse", doc: doc });
            }
            return res.status(401).json({ error: true, msg: 'error occured during creation' });
        }
        return res.status(401).send({ error: true, msg: 'error occured during creation' });

}
/*doctor signin controller*/
module.exports.signIn = async function(req,res){
    const doctor = await Doctor.findOne({ email: req.body.email });
    if(doctor === null){
        res.status(401).json({message:"user not found" })
    }
    else{
        const compare = await bcryptjs.compare(req.body.password,doctor.password);
        if(compare) res.status(200).json({message:"Authentication Successfull",})
        else res.status(404).json({message:"user id and password getting wrong"});
    }
}
/* doctor profile */
module.exports.doctorProfile = async function(req,res){
      const doctor = await Doctor.findById(req.params.id);
      if(doctor){
        res.status(200).json({message:"user profile",doctor:doctor});
      }
      else{
       res.status(404).json({message:"login first"});
      }
}
/* update profile */
module.exports.updateProfile = async function(req,res){
    const doctor = await Doctor.findById(req.params.id);
    if(doctor){
        const doc = Doctor.updateOne(req.body);
        if(doc){
            return res.status(200).json({ message: "successfully updated to databse", doc: doc });
         }
         return res.status(401).json({ error: true, msg: 'error occured during updation' });
    }
    else{
        return res.status(401).json({ error: true, msg: 'user not exist' });
    }
    
}
/* doctor appointments */
module.exports.ListAppointments = async function(req,res){
    const id = req.params.id;
    const pat = await Appointment.find({ doctor_id:id });
    if(pat){
        res.status(200).json({message:"got the appointments",data:pat});
    }
    else{
        res.status(400).json({message:"error occured"});
    }
}
/* approved or reject patient appointment */
module.exports.notification = async function(req,res){
    const id = req.params.id;
    const updatestatus = req.body;
    const data = await Appointment.findByIdAndUpdate(id,updatestatus);
    if(data) res.status(200).json({message:"sent notification",data:data});
    else res.status(404).json({messag:"error occured"});
}
/* generate the bill */
module.exports.bill = async function(req,res){
    const patId = req.params.patId;
    req.body.pat_id = patId;
    const patBill = await BillHistory.create(req.body);
    if(patBill){
        res.status(200).json({message:"successfully generated the bill",data:patBill});
    }
    else{
        res.status(400).json({message:"error occured"});
    }
}
/* generate the prescription and progress report */
module.exports.historyUpdate = async function(req,res){
    const patId = req.params.id;
    const updateData = req.body;
    const data = await BillHistory.findByIdAndUpdate(patId, updateData);
        if(data){
            res.status(200).json({message:"successfully updated his progress report and prescription"});
        }
        else res.status(400).json({message:"error in updation details"});
}
module.exports.patientHistory = async function(req,res){
    const patHistory = await BillHistory.findById(req.params.id);
    if(patHistory) res.status(200).json({message:"got the history",data:patHistory});
    else res.status(404).json({message:"error in getting details"});
}
/*  
1. DoctorProfile: Doctor can see his own profile
2. PendingAppointments: Doctor can see all the pending appointments against his doctor ID.
3. TodaysAppointmemts: the appointments for current day will be shown.The doctor then can select/reject any appointment of that day
4. HistoryUpdate: He can update prescription,disease and progress of patient
5. GenerateBill: He will then generate the bill
6. PatientHistory: Doctor will be able to see the treatment history of all his treated patients.
*/





