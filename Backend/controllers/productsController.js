import productsModel from "../models/productsModel.js";
import slugify from "slugify";

const addProductsController = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    if (!title || !description || !category || !price) {
      return res
        .status(400)
        .send({ success: false, message: "Please fill all the fields" });
    }
    // // checking user email is already exist or not?
    // const isExist = await userModel.findOne({ email });
    // if (isExist) {
    //     return res
    //         .status(400)
    //         .send({ success: false, message: "Email already exist" });
    // }
    // // user encrypting password
    // const hashedPassword = await encryptPassword(password);
    // // creating new user
    // const newuser = await userModel.create({
    //     name,
    //     email,
    //     password: hashedPassword
    // });
    // return res.status(201).send({
    //     success: true,
    //     message: "user register successfully",
    //     newuser,
    // });
    console.log(req.body)
  } catch (error) {
    console.log(`addProductsController error  ${error}`);
    return res.status(400).send({
      success: false,
      message: "error in addProductsController ",
      error,
    });
  }
};
// const getAllCategoriesController = async (req, res) => {
//   try {
//     // basefetching all categories from data
//     const Categories = await categoriesModel.find({});

//     return res.status(201).send({
//       success: true,
//       message: "Categories fetched successfully",
//       Categories,
//     });
//   } catch (error) {
//     console.log(`getAllCategoriesController error  ${error}`);
//     return res.status(400).send({
//       success: false,
//       message: "getAllCategoriesController error",
//       error,
//     });
//   }
// };
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
  //   getAllCategoriesController,
  //   deleteCategoriesController,
  //   updateCategoriesController,getsingleCategoriesController
};
