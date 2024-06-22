import mongoose from "mongoose";
import colors from 'colors';


// mongoose.connect(`mongodb://localhost:27017/shopwave`);

const connectDB = async () => {
    try {

        const con = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`connected to mongoosedb ${con.Connection.host}`.bgBlue);

    } catch (error) {
        console.log(`mongoose connection error - ${error}`);
    }

}
export default connectDB;