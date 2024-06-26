import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

const isAuthorized = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send({ success: false, message: "Unauthorized login: No token provided" });
        }

        const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decodedToken.id);


        return res.status(401).send({ success: false, message: "Unauthorized login: User not found" });


        next();
    } catch (error) {
        console.error(`isAuthorized middleware error: ${error}`);
        res.status(401).send({ success: false, message: "Unauthorized login: Invalid token", error: error.message 

        });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user || user.role !== "1") {
            return res.status(401).send({
                success: false, message: "Forbidden: Only admin can access this route" });
        }
         next();


        } catch (error) {
            console.log(`isAuthorized middleware error: ${error}`);
            res
                .status(401)
                .send({
                    success: false,
                    message: "Unauthorized login: Invalid token",
                    error
                });
        }

    };

    export { isAuthorized, isAdmin };
