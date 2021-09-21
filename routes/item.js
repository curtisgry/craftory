const express = require('express');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Item = require('../models/Item');
const Company = require('../models/Company');

const router = express.Router();

router.post(
        '/',
        catchAsync(async (req, res, next) => {
                const item = new Item(req.body);
                const company = await Company.findById(req.body.company);
                company.items.push(item);
                await item.save();
                await company.save();
                next();
        })
);

router.put('/:id', async (req, res, next) => {
        const { id } = req.params;
        await Item.findByIdAndUpdate(id, req.body);
        next();
});

router.delete('/:id', async (req, res, next) => {
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        next();
});

module.exports = router;
