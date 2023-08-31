const Appointment = require('../../../models/appointment');

module.exports.takeAppointment = async function(req, res) {
   const patId = req.params.patId;
   Appointment.pat_id = patId;
   const appo = await Appointment.create(req.body);
   if(appo){
      res.status(200).json({ message:"successfully inserted",data:appo });
   }
   else{
      res.status(400).json({message:"error caught"});
   }
}
