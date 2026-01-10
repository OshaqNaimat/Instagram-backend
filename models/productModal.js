// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productImage: {
      type: String,
      required: true,
    },
    productTitle: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
