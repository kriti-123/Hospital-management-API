const joi = require('joi')

module.exports = {
    createOrUpdateDetail: {
        body: joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            confirmPassword: joi.ref("password"),
            houseNo: joi.string().min(5),
            dist: joi.string().required(),
            state: joi.string().required(),
            country: joi.string().required(),
            mobileNo: joi.string(),
            gender: joi.string(),
            dept:joi.string()
        })
    }
}