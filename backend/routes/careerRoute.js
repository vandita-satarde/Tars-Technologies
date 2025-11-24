import express from "express";
import { submitApplicant } from "../controllers/careerController.js";
import { resumeUpload } from "../middleware/upload.js";



import {
  uploadImage,
  uploadVideo,
  getCareerText,
  saveCareerText,
  deleteImage,
  getCareerImages,
  deleteApplicant,
  getCareerVideo
} from "../controllers/careerController.js";
import { imageUpload, videoUpload } from "../middleware/upload.js";

const router = express.Router();

router.get("/video", getCareerVideo);

router.get("/section", getCareerText);
router.put("/section", saveCareerText);

router.post("/video", videoUpload.single("video"), uploadVideo);
router.post("/image", imageUpload.single("image"), uploadImage);


router.get("/images", getCareerImages);


router.post("/apply", resumeUpload.single("resume"), submitApplicant);


router.delete("/image/:id", deleteImage);

router.delete("/applicant/:id", deleteApplicant);



export default router; // IMPORTANT ✔️
