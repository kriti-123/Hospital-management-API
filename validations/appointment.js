const Joi = require('joi');
module.exports = {
    createAppointment: {
        body: Joi.object({
            doctor_id: Joi.string().regex(/^[0-9a-fA-F]{24}$}/),
            Disease: Joi.string().required(),
            appointmentDate:Joi.date(),
            appointmentTime:Joi.date(),
            appinmentStatus:Joi.boolean()
            })
    }
}