import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

const isAuthorized = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send({
                success: false, message: "Please login to access this resource"
            });
        }

        const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decodedToken.id);
        next();
    } catch (error) {
        console.error(`isAuthorized middleware error: ${error}`);
        return res
            .status(400)
            .send({
                success: false,
                message: "Error in isAuthorize middleware", error: error.message

            });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user || user.role !== 1) {
            return res
                .status(401)
                .send({
                    success: false,
                    message: "You are not authorize to access this resource"
                });
        }
        next();


    } catch (error) {
        console.log(`isAuthorized middleware error: ${error}`);
        return res
            .status(400)
            .send({
                success: false,
                message: "Error in isAdmin middleware",
                error,
            });
    }

};

export { isAuthorized, isAdmin };
