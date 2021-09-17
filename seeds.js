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

const clearDB = async () => {
  await Company.deleteMany({});
  await Item.deleteMany({});
};

clearDB();

const seedItemsCompany1 = [
  {
    name: "Wooden Wicks",
    link: "https://www.candlescience.com/containers/small_straight_sided_jar",
    qty: 50,
    qtyLow: 30,
    category: "wicks",
  },
  {
    name: "Cotton Wicks Small",
    link: "https://www.candlescience.com/containers/small_straight_sided_jar",
    qty: 100,
    qtyLow: 50,
    category: "wicks",
  },
  {
    name: "Small Jars",
    link: "https://www.candlescience.com/containers/small_straight_sided_jar",
    qty: 30,
    qtyLow: 40,
    category: "containers",
  },
  {
    name: "Wax",
    link: "https://www.candlescience.com/containers/small_straight_sided_jar",
    qty: 23,
    qtyLow: 20,
    category: "wax",
  },
  {
    name: "Wick Stickers",
    link: "https://www.candlescience.com/containers/small_straight_sided_jar",
    qty: 50,
    qtyLow: 20,
    category: "wicks",
  },
  {
    name: "2X4 White Labels",
    link: "https://www.candlescience.com/containers/small_straight_sided_jar",
    qty: 100,
    qtyLow: 20,
    category: "labels",
  },
  {
    name: "Black Lids",
    link: "https://www.candlescience.com/containers/small_straight_sided_jar",
    qty: 30,
    qtyLow: 20,
    category: "containers",
  },
  {
    name: "Silver Lids",
    link: "https://www.candlescience.com/containers/small_straight_sided_jar",
    qty: 23,
    qtyLow: 20,
    category: "wax",
  },
  {
    name: "Apples and Maple Burbon",
    link: "https://www.candlescience.com/containers/small_straight_sided_jar",
    qty: 23,
    qtyLow: 20,
    category: "scents",
  },
  {
    name: "Lavender",
    link: "https://www.candlescience.com/containers/small_straight_sided_jar",
    qty: 23,
    qtyLow: 20,
    category: "scents",
  },
  {
    name: "Fresh Coffy",
    link: "https://www.candlescience.com/containers/small_straight_sided_jar",
    qty: 23,
    qtyLow: 20,
    category: "wax",
  },
];

const seedItemsCompany2 = [
  {
    name: "Chocolate",
    link: "https://www.candlescience.com/containers/small_straight_sided_jar",
    qty: 443,
    qtyLow: 90,
    category: "ingredients",
  },
  {
    name: "Sugar",
    link: "https://www.candlescience.com/containers/small_straight_sided_jar",
    qty: 23,
    qtyLow: 20,
    category: "ingredients",
  },
  {
    name: "Sheet Pan",
    link: "https://www.candlescience.com/containers/small_straight_sided_jar",
    qty: 5,
    qtyLow: 2,
    category: "tools",
  },
];

// const seedCompany1 = async () => {
//         const company = await new Company({
//                 name: 'A gray home',
//                 location: 'Westminster, MA',
//                 email: 'something@something.com',
//         });

//         await company.save();

//         const seeds = seedItemsCompany1.map((item) => ({ ...item, company }));

//         await Item.insertMany(seeds);
// };

// seedCompany1();
// const seedCompany2 = async () => {
//         const company2 = await new Company({
//                 name: 'A different company',
//                 location: 'Boston, MA',
//                 email: 'something@another.com',
//         });

//         await company2.save();

//         const seeds = seedItemsCompany2.map((item) => ({ ...item, company: company2 }));
//         await Item.insertMany(seeds);
// };

// seedCompany2();

// const relateItems1 = async () => {
//         const company = await Company.findById('6140e1e48ac01bb8a607df7c');

//         console.log(company);
// };

// relateItems1();

// const seedDb = async () => {
//         // await Item.deleteMany({});
//         await Item.insertMany(seedItems)
//                 .then((res) => {
//                         console.log(res);
//                 })
//                 .catch((e) => {
//                         console.log(e);
//                 });
// };

// const seedDb = async () => {
//         const company = await Company.findById('6140db4ec83578aa14ba6d98');
//         console.log(company);
//         await Item.updateMany({}, { company });
// };

// seedDb();
