const mongoose = require('mongoose');
const deptSchema = new mongoose.Schema({
    deptName:{
        type:String,
        required:true
    },
});
const dept = mongoose.model('Dept',deptSchema);
module.exports = dept;