const Admin = require('../../../models/admin');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Appoinment = require('../../../models/appointment');
const Doctor = require('../../../models/doctor');
const Patient =  require('../../../models/patient');
/*Admin signUps controller*/
module.exports.signUp = async function (req, res) {
    console.log(req.body);
    if (req.body.password != req.body.confirmPassword) {
        return res.status(401).send({ error: true, msg: 'Password does not match' });
    }
      const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            const bcryptpass = await bcryptjs.genSalt(10);
            const hashpass = await bcryptjs.hash(req.body.password,bcryptpass);
            const hashCpass = await bcryptjs.hash(req.body.confirmPassword,bcryptpass);
            req.body.password = hashpass;
            req.body.confirmPassword = hashCpass;
            const admin = await Admin.create(req.body);
            if(admin){
               return res.status(200).json({ message: "successfully inserted to databse", admin: admin });
            }
            return res.status(401).send({ error: true, msg: 'error occured during creation' });
        }
        return res.status(401).send({ error: true, msg: 'error occured during creation' });

}
/*Admin signin controller*/
module.exports.signIn = async function(req,res){
    const admin = await Admin.findOne({ email: req.body.email });
    if(admin === null){
        res.status(401).json({message:"user not found" })
    }
    else{
        const compare = await bcryptjs.compare(req.body.password,admin.password);
        const token = jwt.sign({admin:admin._id},"kritishreehellop",{expiresIn:'6d'});
        if(compare) res.status(200).json({message:"Authentication Successfull",token:token})
        else res.status(404).json({message:"user id and password getting wrong"});
    }
}
/* update profile */
module.exports.updateProfile = async function(req,res){
    const adminId = req.params.id;
    const updateData = req.body;
    const data = await BillHistory.findByIdAndUpdate(adminId, updateData);
        if(data){
            return res.status(200).json({ message: "successfully updated to databse", adm: data });
         }
        else{
            return res.status(401).json({ error: true, msg: 'user not exist' });
        }
    
}
/* admin profile */
module.exports.adminProfile = async function(req,res){
      const admin = await Admin.findById(req.params.id);
      if(admin){
        res.status(200).json({message:"user profile",admin:admin});
      }
      else{
       res.status(404).json({message:"login first"});
      }
}
/*  find the all appintments  */
module.exports.appointmentsList = async function(req,res){
    const appoint = await Appoinment.find({}).populate('_id');
    if(appoint){
        res.status(200).json({message:"succesfully got the data",appoint:appoint});
    }
    else{
        res.status(404).json({message:"error to get the patient list"});
    }
}
/* find all the patient list */
module.exports.patientList = async function(req,res){
    const appoint = await Patient.find({}).populate('_id');
    if(appoint){
        res.status(200).json({message:"succesfully got the data",appoint:appoint});
    }
    else{
        res.status(404).json({message:"error to get the patient list"});
    }
}
/* find all the doctors which have registered */
module.exports.doctorList = async function(req,res){
    const doct = await Doctor.find({}).populate('_id');
}

/* common profile controller for viewing the complte profile of doctor and patient */
module.exports.viewFullProfile = async function(req,res){
    const id = req.params.id;
    const data = await Doctor.findById(id) || await Patient.findById(id);
    if(await Doctor.findById(id) || await Patient.findById(id)){
        res.status(200).json({message:"successfull got the complete data",data:data});
    }
    else res.status(400).json({message:"error to view the profile"});
}
/* search by company name */
module.exports.searchFilter = async function(req,res){
    const empName = req.body.name;
    console.log(empName);
    const data = await Doctor.findOne({name:empName});
    console.log(data);
    if(data){
        res.status(200).json({success:true,list:data});
    }
    else{
        res.status(400).json({message:"there is no doctor with this name"});
    }
}
/* admin remove the doctor or */
module.exports.removeDoctorPatient = async function(req,res){
    const id = req.params.id;
    if(await Doctor.findByIdAndDelete(id) || await Patient.findByIdAndDelete(id)){
        res.status(200).json({message:"successfully removed "});
    }
    else res.status(400).json({message:"errror occuringin deletion"});
    
}
/*  find the total  */
module.exports.total = async function(req,res){
    const tot = await Patient.countDocuments();
    const totDoc = await Doctor.countDocuments();
    res.status(200).json({message:"succ",total:tot,totDoc:totDoc});
}
 
