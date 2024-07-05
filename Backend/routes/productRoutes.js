import express from "express";

import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";
import { addProductsController, deleteProductController,  getAllProductsController, getsingleProductsController, updateSingleProductsController } from "../controllers/productsController.js";
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
// http://localhost:8080/api/v1/:productId -->Delete
productsRouter .delete(
  "/:productId",
  isAuthorized,
  isAdmin,
  deleteProductController
);

// update Routes of Products


// http://localhost:8080/api/v1/Products/:productId -->Put
productsRouter .put(
 "/:productId",
  upload.single("picture"),
  isAuthorized,
  isAdmin,
  updateSingleProductsController
);

// http://localhost:8080/api/v1/Products/:productId -->get
productsRouter .get(
  "/:productId",
  isAuthorized,
  isAdmin,
  getsingleProductsController
);

export default productsRouter;
