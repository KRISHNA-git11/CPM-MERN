import mongoose from "mongoose";

const companySchema = mongoose.Schema ({
    companyTitle : {
        type: String,
        required: true,
        trim: true
    }, 
    companyAddress : {
        type: String,
        required: true,
        trim: true
    },
    // companyId : {
    //     type: Number,
    // }
    companyEmail : {
        type: String,
        required: true,
        trim: true
    },
    profileImage: {
        type: String, // Assuming the image will be stored as a URL or file path
        trim: true
    }
})

const Company = mongoose.model('Company', companySchema)

export default Company;