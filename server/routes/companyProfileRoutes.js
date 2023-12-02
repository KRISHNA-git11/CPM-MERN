import express from "express";
import { createCompanyProfile, getCompanyProfile } from "../controllers/companyController.js";

const router = express.Router();
router.post("/create", createCompanyProfile);
router.get("/:companyTitle", getCompanyProfile);

export default router;