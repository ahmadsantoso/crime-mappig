const router = require('express').Router();
const User = require('../../component/model/user');
const Joi = require('@hapy/joi');

const registerValidation = () => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
}

