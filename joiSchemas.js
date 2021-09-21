const Joi = require('joi');

module.exports.companySchema = Joi.object({
        company: Joi.object({
                name: Joi.string().required(),
                location: Joi.string(),
        }).required(),
});

module.exports.itemSchema = Joi.object({
        item: Joi.object({
                name: Joi.string().required(),
                qty: Joi.number().required(),
                qtyLow: Joi.number().required(),
                link: Joi.string(),
        }).required(),
});

module.exports.userSchema = Joi.object({
        email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
        username: Joi.string().alphanum().min(3).max(15).required().messages({
                'string.min': 'Username must be more than 3 characters and less than 15',
        }),
        /* eslint-disable */
        //validate password requirements
        password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().messages({
                'string.pattern.base':
                        'Password must be 8 or more characters and contain at least one uppercase letter, one lowercase letter and one number.',
        }),
        /* eslint-disable */
}).required();
