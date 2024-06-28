import express from 'express';

import { isAdmin, isAuthorized } from '../middlewaves/authMiddleware.js';
import { createCategoriesController } from '../controllers/categoriesController.js';



const categoriesRouter = express.Router();

// http://localhost:8080/api/v1/categories -->POST

// Admin Routes
categoriesRouter.post("/", isAuthorized, isAdmin, createCategoriesController)

export default categoriesRouter;