import Product from "../models/productModal.js";

export const sellProduct = async (req, res) => {
  try {
    const { user_id } = req.params;
    const {
      productTitle,
      productDescription,
      productCategory,
      productPrice,
    } = req.body;

    const productImage = req.file?.path; // multer image

    if (!productImage) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = await Product.create({
      productImage,
      productTitle,
      productDescription,
      productCategory,
      productPrice,
      user_id,
    });

    res.status(201).json({
      success: true,
      message: "Product listed successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
