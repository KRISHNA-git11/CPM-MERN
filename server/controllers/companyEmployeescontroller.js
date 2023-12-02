import expressAsyncHandler from "express-async-handler";
import Company from "../models/companyProfileModel.js";
import User from "../models/userModel.js";
import CompanyEmployees from "../models/companyEmployeesModel.js";


const createOrUpdateCompanyEmployees = expressAsyncHandler(async (req, res) => {
    console.log(req.body)
    const { companyId, employees } = req.body;
  
    try {
      let companyEmployees = await CompanyEmployees.findOne({ companyId });

      if (!companyEmployees) {
        companyEmployees = await CompanyEmployees.create({
            companyId,
            employees: [employees],
        });
      } else {
        companyEmployees.employees.push(employees);
        await companyEmployees.save();
      }
  
      res.status(200).json({
        _id: companyEmployees._id,
        companyId: companyEmployees.companyId,
        employees: companyEmployees.employees,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating or updating CompanyEmployees',
        error: error.message,
      });
    }
});


const getAllEmployeesByCompanyId = expressAsyncHandler(async(req, res) => {
    const companyId = req.params.id;
    try {
      let company = await CompanyEmployees.findOne({companyId})
      if(!company) {
        throw new Error("No company found")
      }

      res.status(200).json(company.employees)

    } catch (error) {
      res.status(500).json({
        message: 'Error fetching the employees',
        error: error.message,
      });
    }
});


  export {
    createOrUpdateCompanyEmployees,
    getAllEmployeesByCompanyId
  };