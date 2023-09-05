const joi = require('joi');
module.exports = {
    createOrUpdateDetail: {
        body: joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string(),
            confirmPassword: joi.ref("password"),
            houseNo: joi.string(),
            pincode: joi.string(),
            dist: joi.string().required(),
            state: joi.string().required(),
            country: joi.string().required(),
            mobileNo: joi.string(),
            gender: joi.string(),
            bloodGroup: joi.string()
        })
    },
    update:
    {
        body: joi.object({
            name: joi.string(),
            houseNo: joi.string(),
            pincode: joi.string(),
            dist: joi.string(),
            state: joi.string(),
            country: joi.string(),
            mobileNo: joi.string(),
            gender: joi.string(),
            bloodGroup: joi.string()
        })
    }

}