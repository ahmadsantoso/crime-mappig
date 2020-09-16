const Joi = require('@hapy/joi');

const registerValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    Joi.validate(data, schema);
};

const loginValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    Joi.validate(data, schema);
};

module.export.registerValidation = registerValidation;
module.export.loginValidation = loginValidation;


