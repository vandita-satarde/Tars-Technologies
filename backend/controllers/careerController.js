import CareerSection from "../models/careerModel.js";
import cloudinary from "../utils/cloudinary.js";


export const getCareerVideo = async (req, res) => {
  try {
    const data = await CareerSection.findOne();
    res.status(200).json({ success: true, data: data?.video || null });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// ➤ Delete Applicant
export const deleteApplicant = async (req, res) => {
  try {
    const { id } = req.params; // The ID of the specific applicant sub-document

    // Find the Career document and pull the applicant from the array
    const updatedSection = await CareerSection.findOneAndUpdate(
      {}, 
      { $pull: { applicants: { _id: id } } },
      { new: true } // Return the updated document
    );

    if (!updatedSection) {
      return res.status(404).json({ success: false, msg: "Section not found" });
    }

    res.json({ success: true, msg: "Applicant deleted", applicants: updatedSection.applicants });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// ➤ Update or Create Text Section
export const saveCareerText = async (req, res) => {
  try {
    let data = await CareerSection.findOne();
    if (!data) data = new CareerSection(req.body);
    else Object.assign(data, req.body);

    await data.save();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// ➤ Fetch Text
export const getCareerText = async (req, res) => {
  try {
    const data = await CareerSection.findOne();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// ➤ Upload Image
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, msg: "No file uploaded" });
    }

    let data = await CareerSection.findOne();
    if (!data) data = new CareerSection();

    // 🔥 Save Cloudinary response directly
    data.images.push({
      url: req.file.path,         // Cloudinary URL
      public_id: req.file.filename,  // Cloudinary public id
    });

    await data.save();

    res.json({ success: true, data: data.images });

  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};


// ➤ Upload Video
export const uploadVideo = async (req, res) => {
  try {
    console.log("REQ FILE:", req.file);  // 🔥 DEBUG HERE

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No video uploaded", file: req.file });
    }

    let data = await CareerSection.findOne() || new CareerSection();

    data.video = {
      url: req.file.path,
      public_id: req.file.filename,
    };

    await data.save();
    res.status(200).json({ success: true, data: data.video });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ success: false, msg: err.message });
  }
};



// ➤ Delete Image
export const deleteImage = async (req, res) => {
  try {
    let data = await CareerSection.findOne();
    if (!data) return res.status(404).json({ success: false, msg: "No data found" });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(req.params.id);

    // Delete from MongoDB
    data.images = data.images.filter(img => img.public_id !== req.params.id);

    await data.save();

    res.json({ success: true, msg: "Image deleted", images: data.images });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};



export const getCareerImages = async (req, res) => {
  try {
    const data = await CareerSection.findOne();
    return res.status(200).json({
      success: true,
      images: data?.images || []   // 🛡️ safe fallback
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const job = new Career(req.body);
    await job.save();
    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Career.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};



export const submitApplicant = async (req, res) => {
  try {
    console.log("📥 Received Body:", req.body);

    // ➤ Destructure jobType here
    const { fullName, email, mobile, address, jobType } = req.body;
    let rawTechnologies = req.body.selectedTechnologies;
    const resumeFile = req.file;

    // Robust JSON Parsing
    let finalTechnologies = [];
    try {
      if (typeof rawTechnologies === "string") {
        finalTechnologies = JSON.parse(rawTechnologies);
      } else if (Array.isArray(rawTechnologies)) {
        finalTechnologies = rawTechnologies;
      }
    } catch (parseError) {
      console.error("⚠️ JSON Parse Error:", parseError);
      finalTechnologies = [];
    }

    let careerSection = await CareerSection.findOne();
    if (!careerSection) careerSection = new CareerSection();
    if (!careerSection.applicants) careerSection.applicants = [];

    // ➤ Push Data (Include jobType)
    careerSection.applicants.push({
      fullName,
      email,
      mobile,
      jobType: jobType || "Full Time", // Default fallback
      address,
      selectedTechnologies: finalTechnologies,
      resume: resumeFile
        ? { url: resumeFile.path, public_id: resumeFile.filename }
        : undefined,
    });

    await careerSection.save();
    res.status(200).json({ success: true, message: "Application submitted!" });

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


