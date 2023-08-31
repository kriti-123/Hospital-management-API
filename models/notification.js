const mongoose = require('mongoose');
const patientAppointment = require('./appointment');
const notificationSchema = new mongoose.Schema({
    status:{
        type:String,
        required:true
    },
    appoinId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Apponitment'
    }
});
const noti = mongoose.model('Noti',notificationSchema);
module.exports = noti;