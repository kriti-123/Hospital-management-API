const mongoose  = require('mongoose');
const patApointmentSchema = new mongoose.Schema({
    pat_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"
    },
    doctor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
    },
    Disease:{
        type:String,
        required:true
    },
    appointmentDate:{
        type:Date,
        // required:true
    },
    appointmentTime:{
        type:Date,
        // required:true
    },
    appinmentStatus:{
        type:Boolean,
        default: false
    }
});
const patientAppointment = mongoose.model('Apponitment',patApointmentSchema);
module.exports = patientAppointment;
