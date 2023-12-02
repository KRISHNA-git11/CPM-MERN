import express from "express";
import { officialProtected, protect } from "../middleware/authMiddleware.js";
import { createBid, getBidsById } from "../controllers/bidController.js";
import multer from "multer";
import path from 'path'

// const destinationPath = path.join(__dirname, "../files");

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { deleteBidByName } from "../controllers/bidController.js";
import { editBidByName } from "../controllers/bidController.js";
import { getAllActiveBids } from "../controllers/bidController.js";
import { getBidsByProjectTitle } from "../controllers/bidController.js";

// Get the absolute path to the destination directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const destinationPath = path.join(__dirname, "../files/projectFiles");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now();
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/createBid", officialProtected, upload.array("files"), createBid)
router.delete("/deleteBid/:bidName", officialProtected, deleteBidByName)
router.put("/editBid/:bidName", officialProtected, editBidByName);
router.get("/activeBids", getAllActiveBids);
// router.get("/bid/:projectTitle", getBidsByProjectTitle)
router.get("/bid/:id", getBidsById)


export default router;

