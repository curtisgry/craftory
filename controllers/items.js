const Item = require('../models/Item');
const Company = require('../models/Company');

module.exports.newItem = async (req, res, next) => {
        console.log(req.body);
        const item = new Item(req.body);
        const company = await Company.findById(req.body.company);
        company.items.push(item);
        await item.save();
        await company.save();
        res.send({ status: 200 });
};

module.exports.updateItem = async (req, res, next) => {
        const { id } = req.params;
        await Item.findByIdAndUpdate(id, req.body);
        res.send({ status: 200 });
};

module.exports.deleteItem = async (req, res, next) => {
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        res.send({ status: 200 });
};
