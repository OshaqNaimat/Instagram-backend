// controllers/productController.js
const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const { user_id } = req.params;
    const {
      productTitle,
      productPrice,
      productDescription,
    } = req.body;

    const productImage = req.file ? req.file.path : "";

    if (!productTitle || !productPrice || !productDescription || !productImage) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.create({
      productImage,
      productTitle,
      productPrice,
      productDescription,
      user_id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
