import mongoose from "mongoose";



const employeeSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },

    employeeId : {
        type: String,
        trim: true,
        required: true
    }
    // Add other employee details as needed
  });


  const companyEmployeesSchema = mongoose.Schema ({
    companyId : {
        type : String,
        required: true,
        trim: true
    },
    
    employees: [employeeSchema],
    
})

const CompanyEmployees = mongoose.model('CompanyEmployees', companyEmployeesSchema);

export default CompanyEmployees;