const Joi = require('joi');

function validateUser(name, email, password) {
    const userSchema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).max(20).required(),
        phone: Joi.string(),
        address: Joi.string(),
        age: Joi.number().integer().min(3).max(100),
    });

    return userSchema.validate(name, email, password);
}

module.exports = validateUser;
