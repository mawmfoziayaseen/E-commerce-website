import { encryptPassword } from '../helper/userHelper.js';
import userModel from '../models/userModel.js';





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

        const newuser = await userModel
            .create({
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
}

export { registerController };