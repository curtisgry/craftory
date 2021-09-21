const mongoose = require('mongoose');
const Item = require('./Item');

const { Schema } = mongoose;

const companySchema = new Schema({
        name: {
                type: String,
                required: [true, 'Company must have a name!'],
        },
        location: {
                type: String,
        },
        // Remove email at some point. Dont need it
        items: [
                {
                        type: Schema.Types.ObjectId,
                        ref: 'Item',
                },
        ],
        user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
        },
});

companySchema.post('findOneAndDelete', async function (company) {
        if (company.items.length) {
                const res = await Item.deleteMany({ _id: { $in: company.items } });
              
        }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
