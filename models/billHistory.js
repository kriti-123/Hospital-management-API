const mongoose = require('mongoose');
const billHistorySchema = new mongoose.Schema({
    depositDate: {
        type: Date,
        // required:true
    },
    amount: {
        type: Number,
        required: true
    },
    duesAmmount: {
        type: Number,
        required: true
    },
    pat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
    },
    medicine: [{
        type: String,
    }],
    progress: {
        type: String
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
});
const billHistory = mongoose.model('Bill', billHistorySchema);
module.exports = billHistory;
