import express from "express";

import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";
import { addProductsController, getAllProductsController } from "../controllers/productsController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const productsRouter = express.Router();

// http://localhost:8080/api/v1/Products-->get
// productsRouter .get("/", getAllProductsController);

productsRouter.get(
  "/",
 
  getAllProductsController
);


// http://localhost:8080/api/v1/Products-->POST

// Admin Routes
productsRouter.post(
  "/",
  upload.single("picture"),
  isAuthorized,
  isAdmin,
  addProductsController
);

// delete Routes of Products
// http://localhost:8080/api/v1/Products/:slug -->Delete
// productsRouter .delete(
//   "/:slug",
//   isAuthorized,
//   isAdmin,
//   deleteProductsController
// );

// update Routes of Products
// http://localhost:8080/api/v1/Products/:slug -->Put
// productsRouter .put(
//   "/:slug",
//   isAuthorized,
//   isAdmin,
//   updateProductsController
// );

// http://localhost:8080/api/v1/Products/:slug -->get
// productsRouter .get(
//   "/:slug",
//   isAuthorized,
//   isAdmin,
//   getsingleProductsController
// );

export default productsRouter;
