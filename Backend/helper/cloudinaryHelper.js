import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// Configuration
cloudinary.config({
  cloud_name: "ddimewchh",
  api_key: "451573614122227",
  api_secret: "ZnarqSMm5bcSaq1CLhRkVCxSzZc", // Click 'View Credentials' below to copy your API secret
});
const uploadImageOnCloudinary = async (filePath, folderName) => {
  try {
    // uploading image from server
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
    });
    // delete image from server
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.log("failrd to delete image from server", error);
    }
    // console.log(result);
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error(error);
  }
};
export { uploadImageOnCloudinary };
