import express from "express";
import { createBidPost } from "../controllers/bidPostController.js";

import multer from "multer";
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const destinationPath = path.join(__dirname, "../files/bidPosts");

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

router.post("/addPosting", upload.array("files"), createBidPost);


export default router;