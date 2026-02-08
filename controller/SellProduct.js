import { Product } from "../models/productModal.js";

// ✅ Sell / Create Product (attached to user)
export const sellProduct = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { image, title, price, description } = req.body;

    if (!user_id) {
      return res.status(401).json({ message: "User ID required" });
    }

    if (!image || !title || !price || !description) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const newProduct = await Product.create({
      image,
      title,
      price,
      description,
      user_id, // 🔥 IMPORTANT: link product to user
    });

    res.status(201).json({
      success: true,
      message: "Product listed successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Get all products (with username + image populated)
export const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find()
      .populate("user_id", "username image")
      .sort({ createdAt: -1 });

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get only logged-in user's products
export const relaventProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const myProducts = await Product.find({ user_id: id });

    res.status(200).json(myProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
