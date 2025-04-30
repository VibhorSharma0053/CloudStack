const express = require("express");
const router = express.Router();
const { upload, uploadFile, getAllFiles, getUserFiles } = require("../controllers/fileController");

router.post('/upload', upload.single('file'), uploadFile)

router.get('/all', getAllFiles);
router.get("/user/:userId", getUserFiles);

module.exports = router;
