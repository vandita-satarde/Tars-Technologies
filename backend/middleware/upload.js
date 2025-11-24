import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";
import path from "path";


// Image Upload
export const imageUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "career_images",
      resource_type: "image",
    },
  }),
});


// Video Upload
export const videoUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "career_videos",
      resource_type: "video",
    },
  }),
});

// Resume Upload
export const resumeUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      return {
        folder: "career_resumes",
        // 'auto' allows both PDFs/Docs (raw) and Images (png/jpg) to be uploaded correctly
        resource_type: "auto", 
        // Optional: Maintain original filename for easier identification
        public_id: `${Date.now()}-${file.originalname.split('.')[0]}`, 
      };
    },
  }),
});
