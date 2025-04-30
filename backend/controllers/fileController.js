const multer = require("multer");
const File = require("../models/fileModel");
const path = require("path");

// Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// Upload File controller Function
const uploadFile = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const fileData = new File({
      userId,
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    const savedFile = await fileData.save();
    res.status(200).json({ message: "File uploaded successfully", file: savedFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading file" });
  }
};

// Get All Uploaded Files
const getAllFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ msg: "Could not fetch files", error });
  }
};

const getUserFiles = async (req, res) => {
  try {
    const { userId } = req.params;
    const files = await File.find({ userId });

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Error fetching files" });
  }
};

module.exports = {
  upload,
  uploadFile,
  getAllFiles,
  getUserFiles
};
