import express from 'express';
import { createOrUpdateCompanyEmployees, getAllEmployeesByCompanyId } from '../controllers/companyEmployeescontroller.js';


const router = express.Router();
router.post("/addEmployee", createOrUpdateCompanyEmployees)
router.get("/getEmployees/:id", getAllEmployeesByCompanyId)

export default router