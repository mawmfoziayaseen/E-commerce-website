import express from "express";

import { isAdmin, isAuthorized } from "../middlewaves/authMiddleware.js";
import {
  createCategoriesController,
  getAllCategoriesController,
  deleteCategoriesController,
  updateCategoriesController,
  getsingleCategoriesController,
} from "../controllers/categoriesController.js";

const categoriesRouter = express.Router();

// http://localhost:8080/api/v1/categories -->get
categoriesRouter.get("/", getAllCategoriesController);

// http://localhost:8080/api/v1/categories -->POST

// Admin Routes
categoriesRouter.post("/", isAuthorized, isAdmin, createCategoriesController);

// delete Routes of categories
// http://localhost:8080/api/v1/categories/:slug -->Delete
categoriesRouter.delete(
  "/:slug",
  isAuthorized,
  isAdmin,
  deleteCategoriesController
);

// update Routes of categories
// http://localhost:8080/api/v1/categories/:slug -->Put
categoriesRouter.put(
  "/:slug",
  isAuthorized,
  isAdmin,
  updateCategoriesController
);

// http://localhost:8080/api/v1/categories/:slug -->get
categoriesRouter.get(
  "/:slug",
  isAuthorized,
  isAdmin,
  getsingleCategoriesController
);

export default categoriesRouter;
