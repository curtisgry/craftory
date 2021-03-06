const { companySchema, itemSchema, userSchema } = require('./joiSchemas');
const Company = require('./models/Company');
const ExpressError = require('./utils/ExpressError');

// redirect home if not logged in.
module.exports.ensureAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
                return next();
        }
        res.redirect('/');
};

module.exports.isOwner = async (req, res, next) => {
        const { id } = req.params;
        const company = await Company.findById(id);
        if (!company.user.equals(req.user._id)) {
                return res.redirect(`/`);
        }
        next();
};

// JOI schema validations
module.exports.validateItem = (req, res, next) => {
        const { error } = itemSchema.validate(req.body);
        if (error) {
                const msg = error.details.map((el) => el.message).join(',');
                throw new ExpressError(msg, 400);
        } else {
                next();
        }
};

module.exports.validateCompany = (req, res, next) => {
        const { error } = companySchema.validate(req.body);
        if (error) {
                const msg = error.details.map((el) => el.message).join(',');
                throw new ExpressError(msg, 400);
        } else {
                next();
        }
};

module.exports.validateUser = (req, res, next) => {
        const { error } = userSchema.validate(req.body);

        if (error) {
                const msg = error.details.map((el) => el.message).join(',');
                throw new ExpressError(msg, 400);
        } else {
                next();
        }
};
