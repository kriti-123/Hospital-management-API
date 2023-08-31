const mongoose  = require('mongoose');
const feedbackSchema = new mongoose.Schema({
    pat_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"
    },
   feedMsg:{
   type:String
    }
});
const feedback = mongoose.model('Feedback',feedbackSchema);
module.exports = feedback;
