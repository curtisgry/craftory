const express = require("express");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Company = require("../models/Company");

const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const id = req.user._id;
  const newCompany = new Company(req.body);
  newCompany.user = id;

  await newCompany.save();
});

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
