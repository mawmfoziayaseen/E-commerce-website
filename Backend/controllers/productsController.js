import {
  deleteImageOnCloudinary,
  uploadImageOnCloudinary,
} from "../helper/cloudinaryHelper.js";
import productsModel from "../models/productsModel.js";
// import slugify from "slugify";

//Adding product controller

const addProductsController = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const picture = req.file?.fieldname;
    const picturePath = req.file?.path;
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !picture ||
      !picturePath
    ) {
      return res
        .status(400)
        .send({ success: false, message: "Please fill all the fields" });
    }
    // uploadin image on server
    const { secure_url, public_id } = await uploadImageOnCloudinary(
      picturePath,
      "product"
    );
    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Please upload a valid image",
        error: secure_url,
      });
    }
    const product = await productsModel.create({
      title,
      description,
      category,
      price,
      user: req.user._id,
      picture: { secure_url, public_id },
    });
    return res.status(201).send({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.log(`addProductsController error  ${error}`);
    return res.status(400).send({
      success: false,
      message: "error in addProductsController ",
      error,
    });
  }
};

const getAllProductsController = async (req, res) => {
  try {
    const products = await productsModel
      .find({})
      .populate("user", "name")
      .populate("category", "name");

    return res.status(200).send({
      success: true,
      total: products.length,
      message: " All Products added successfully",
      products,
    });
  } catch (error) {
    console.log(` getAllProductsController error  ${error}`);
    return res.status(400).send({
      success: false,
      message: "error in  getAllProductsController ",
      error,
    });
  }
};
const deleteProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productsModel.findById(productId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    // delete product image from cloudinary
    if (product.picture && product.picture.public_id) {
      await deleteImageOnCloudinary(product.picture.public_id);
    }
    await productsModel.findByIdAndDelete(productId);
    return res.status(200).send({
      success: true,
      message: "  Products deleted successfully",
    });
  } catch (error) {
    console.log(` deleteProductsController  error  ${error}`);
    return res.status(400).send({
      success: false,
      message: "error in  deleteProductsController",
      error,
    });
  }
};

const getsingleProductsController = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productsModel
      .findById(productId)
      .populate("user", "name")
      .populate("category", "name");
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "  Product detail fetched successfully",
    });
  } catch (error) {
    console.log(` getsingleProductsController  error  ${error}`);
    return res.status(400).send({
      success: false,
      message: "error in  getsingleProductsController",
      error,
    });
  }
};

const updateSingleProductsController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, description, category, price } = req.body;
    
    const picturePath = req.file?.path;

    const product = await productsModel.findById(productId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    if (title) product.title = title;
    if (description) product.description = description;
    if (category) product.category = category;
    if (price) product.price = price;

    // code of upload new image
    if (picturePath) {
      const { secure_url, public_id } = await uploadImageOnCloudinary(
        picturePath,
        "products"
      );

      // delete product image from cloudinary
      if (product.picture && product.picture.public_id) {
        await deleteImageOnCloudinary(product.picture.public_id);
      }

      product.picture = {
        secure_url,
        public_id
      }
    }
    await product.save();
    return res.status(200).send({success:true,
      message:"product detail updated successfully",
      product,
    })
  } catch (error) {
    console.log(`  updateSingleProductsController  error  ${error}`);
    return res.status(400).send({
      success: false,
      message: "error in   updateSingleProductsController",
      error,
    });
  }
};

export {
  addProductsController,
  getAllProductsController,
  deleteProductController,
  getsingleProductsController,
  updateSingleProductsController,
};
