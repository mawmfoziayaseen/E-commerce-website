import { uploadImageOnCloudinary } from "../helper/cloudinaryHelper.js";
import productsModel from "../models/productsModel.js";
import slugify from "slugify";

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
      "products"
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

    return res.status(201).send({
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

// const deleteCategoriesController = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     // fetching category  for delete from database
//     const Category = await categoriesModel.findOneAndDelete({ slug });
//     if (!Category) {
//       return res.status(400).send({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     return res.status(201).send({
//       success: true,
//       message: "Category deleted successfully",
//     });
//   } catch (error) {
//     console.log(`deleteCategoriesController error  ${error}`);
//     return res.status(400).send({
//       success: false,
//       message: "deleteCategoriesController error",
//       error,
//     });
//   }
// };
// const getsingleCategoriesController = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     // fetching category  for delete from database
//     const category = await categoriesModel.findOne({ slug });
//     if (!category) {
//       return res.status(400).send({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     return res.status(201).send({
//       success: true,
//       message: "Category  is fetched successfully",
//       category,
//     });
//   } catch (error) {
//     console.log(`getsingleCategoriesController rror  ${error}`);
//     return res.status(400).send({
//       success: false,
//       message: "getsingleCategoriesController error",
//       error,
//     });
//   }
// };
// const updateCategoriesController = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const { name } = req.body;
//     // fetching category  for update from database
//     // vaildation check
//     if (!name) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Category name is required" });
//     }
//     // fetching category  for delete from database
//     const category = await categoriesModel.findOneAndUpdate({ slug },
//       {name,slug:slugify(name,{lower:true,strict:true})},{new:true});
//     if (!category) {
//       return res.status(400).send({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     return res.status(201).send({
//       success: true,
//       message: "Category updateded successfully",
//     });
//   } catch (error) {
//     console.log(`updateCategoriesController error  ${error}`);
//     return res.status(400).send({
//       success: false,
//       message: "updateCategoriesController error",
//       error,
//     });
//   }
// };

export {
  addProductsController,
  getAllProductsController,

  //   deleteCategoriesController,
  //   updateCategoriesController,getsingleCategoriesController
};
