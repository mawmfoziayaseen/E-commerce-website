import express from 'express';
import { registerController,loginController ,logoutController,allUsersController} from '../controllers/userController.js';


const userRouter = express.Router();

// http://localhost:8080/api/v1/users/register
userRouter .post("/register",registerController);
userRouter .post("/login",loginController)
userRouter .get("/logout",logoutController)
// Admin Routes
userRouter .get("/all-users",allUsersController)





export default userRouter ;