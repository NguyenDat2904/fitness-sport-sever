const Joi = require('joi');

function validateUser(userData) {
    const userSchema = Joi.object({
        name: Joi.string()
            .regex(/^[\p{L} ]+$/u)
            .min(3)
            .max(50),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } }),
        password: Joi.string().min(6).max(20),
        phone: Joi.string().pattern(new RegExp('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')),
        address: Joi.string(),
        age: Joi.number().integer().min(3).max(100),
    });

    return userSchema.validate(userData);
}

module.exports = validateUser;
