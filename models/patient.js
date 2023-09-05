const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    houseNo:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    dist:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    bloodGroup:{
        type:String,
        required:true
    }

});
const patient = mongoose.model('Patient',patientSchema);
module.exports = patient;