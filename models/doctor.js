const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
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
    dept:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Dept",
        // required:true
    }

});
const doctor = mongoose.model('Doctor',doctorSchema);
module.exports = doctor;