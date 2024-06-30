import categoriesModel from "../models/categoriesModel.js";
import slugify from "slugify";

const createCategoriesController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Category name is required" });
    }
    // checking categories is already exist or not?
    const isExist = await categoriesModel.findOne({ name });
    if (isExist) {
      return res
        .status(400)
        .send({ success: false, message: "Categories already exist" });
    }

    // creating new user
    const category = await categoriesModel.create({
      name, // Sumsang Mobile
      slug: slugify(name, {
        lower: true,
        strict: true,
      }), // convert tu sumsung-mobile
    });
    return res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(`createCategoriesController error  ${error}`);
    return res
      .status(400)
      .send({
        success: false,
        message: "createCategoriesController error",
        error,
      });
  }
};
const getAllCategoriesController = async (req, res) => {
    try {
    
      // basefetching all categories from data
      const Categories = await categoriesModel.find({});
   
      return res.status(201).send({
        success: true,
        message: "Categories fetched successfully",
        Categories,
      });
    } catch (error) {
      console.log(`getAllCategoriesController error  ${error}`);
      return res
        .status(400)
        .send({
          success: false,
          message: "getAllCategoriesController error",
          error,
        });
    }
  };
export { createCategoriesController,getAllCategoriesController  };
