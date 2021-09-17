const mongoose = require("mongoose");

const { Schema } = mongoose;

const itemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name cannot be blank"],
  },
  link: String,
  qty: {
    type: Number,
    required: true,
    min: 0,
  },
  qtyLow: {
    type: Number,
    min: 0,
  },
  category: String,
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
});

itemSchema.index({ name: "text", category: "text", upc: "text" });

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
