import Products from "../models/productModal.js";

export const Productsell = async (req, res) => {
  try {
    const { user_id } = req.params;
    const {
      productTitle,
      productDescription,
      productPrice,
      productImage
    } = req.body;

    // const productImage = req.file?.path; // multer image

    if (!productImage) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = await product.create({
      productImage,
      productTitle,
      productDescription,
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
