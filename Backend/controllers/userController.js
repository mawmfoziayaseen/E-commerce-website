import { encryptPassword, matchPassword } from '../helper/userHelper.js';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ success: false, message: "Please fill all the fields" });
        }
        // checking user email is already exist or not?
        const isExist = await userModel.findOne({ email });
        if (isExist) {
            return res
                .status(400)
                .send({ success: false, message: "Email already exist" });
        }
        // user encrypting password
        const hashedPassword = await encryptPassword(password);
        // creating new user
        const newuser = await userModel.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).send({
            success: true,
            message: "user register successfully",
            newuser,
        });
    } catch (error) {
        console.log(`User Controller error  ${error}`);
        return res.status(400).send({ success: false, message: "User Controller error", error });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            return res
                .status(400)
                .send({
                    success: false,
                    message: "Please fill all the fields"
                });
        }
        // checking user email in database or not
        const user = await userModel.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .send({ success: false, message: "Email or password is incorrect" });
        }
        // matching password
        const isMatch = await matchPassword(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ success: false, message: "Email or password is incorrect" });
        }
        // Generating token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXP }
        );

        // remove password field to send user data from backend to frontend
        user.password = undefined;
        // return success response
        return res.cookie("token", token, { httpOnly: true, secure: true })
            .status(200).send({
                success: true,
                message: "Login successfully",
                user, token
            });
    } catch (error) {
        console.log(`Login Controller error  ${error}`);
        return res.status(400).send({
            success: false, message: "Login Controller error",
            error
        });
    }
};
const logoutController = async (req, res) => {
    // return success response
    return res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0)
    })   // to remove cookies from browser
        .status(200).send({
            success: true,
            message: "Logout successfully"
        });


}

const allUsersController = async (req, res) => {
    try {
        //find all users in database
        const users = await userModel.find({}).select("-password");
        if (!users) {
            return res.status(404).send({
                success: false,
                message: "No users found"
            }); 
        }
        return res.status(200).send({
            success: true, total: users.length,
            users,
        });

    } catch (error) {
        console.log(`all users controller error ${error}`);
        return res.status(400).send({
            success: false,
            message: "all users controller error",
            error
        });
    }
};

export { registerController, loginController, logoutController, allUsersController };
