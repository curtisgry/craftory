const Company = require('../models/Company');

module.exports.newCompany = async (req, res) => {
        const id = req.user._id;
        const newCompany = new Company(req.body);
        newCompany.user = id;
        await newCompany.save();
        res.send({ status: 200 });
};

module.exports.getCompanies = async (req, res) => {
        const { id } = req.params;

        const company = await Company.findById(id).populate('items');

        const { items } = company;

        res.send({ items, company });
};

module.exports.updateCompany = async (req, res, next) => {
        const { id } = req.params;
        await Company.findByIdAndUpdate(id, req.body);
        res.send({ status: 200 });
};

module.exports.deleteCompany = async (req, res, next) => {
        const { id } = req.params;
        await Company.findByIdAndDelete(id);
        res.send({ status: 200 });
};
