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
