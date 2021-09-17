const mongoose = require("mongoose");
const Company = require("./models/Company");
const Item = require("./models/Item");

mongoose
  .connect("mongodb://localhost:27017/craftoryDev")
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((e) => {
    console.log("MONGO CONNECTION ERROR");
    console.log(e);
  });

// const p = new Product({
//         name: 'Ruby Grapefruit',
//         price: 1.99,
//         category: 'fruit',
// });

// p.save()
//         .then((p) => {
//                 console.log(p);
//         })
//         .catch((e) => {
//                 console.log(e);
//         });

// name: {
//         type: String,
//         required: [true, 'Name cannot be blank'],
// },
// upc: String,
// link: String,
// qty: {
//         type: Number,
//         required: true,
//         min: 0,
// },
// category: String,
// company: {
//         type: Schema.Types.ObjectId,
//         ref: 'Company',
// },

// const seedDb = async () => {
//         const company = await new Company({
//                 name: 'A different company',
//                 location: 'Westminster, MA',
//                 email: 'something@something.com',
//         });
//         await company.save();
// };

// seedDb();

const testDb = async () => {
  const company = await Company.findById("6140db4ec83578aa14ba6d98");
  const items = await Item.find({}).populate({
    path: "company",
    match: { _id: { $eq: "6140db4ec83578aa14ba6d98" } },
  });

  console.log(items);
  // items.forEach((item) => company.items.push(item));
  // await company.save();
};

testDb();
