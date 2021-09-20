const express = require("express");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Company = require("../models/Company");
const { ensureAuthenticated, isOwner } = require("../middleware");
const Item = require("../models/Item");

const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const id = req.user._id;
  const newCompany = new Company(req.body);
  newCompany.user = id;

  await newCompany.save();
});

router.get(
  "/:id",
  ensureAuthenticated,
  isOwner,
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const company = await Company.findById(id);
    const items = await Item.find().populate("company");
    const filtered = items.filter((item) => item.company.name === company.name);
    res.send({ filtered, company });
  })
);

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  await Company.findByIdAndUpdate(id, req.body);
  next();
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  await Company.findByIdAndDelete(id);
  next();
});

module.exports = router;
