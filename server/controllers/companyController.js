import expressAsyncHandler from "express-async-handler";
import Company from "../models/companyProfileModel.js";

const createCompanyProfile = expressAsyncHandler(async(req, res) => {
    const { companyTitle, companyAddress, companyEmail, profileImage } = req.body;
    try {
        const companyProfile = await Company.create({
            companyTitle,
            companyEmail,
            companyAddress,
            profileImage
        })
        if(companyProfile) {
            res.status(200).json({
                _id: companyProfile._id,
                companyTitle: companyProfile.companyTitle
            })
        } else {
            res.status(400)
            throw new Error("Company Profile Creation Failed");
        }
    } catch(e) {
        throw new Error(e)
    }
})

const getCompanyProfile = expressAsyncHandler(async(req, res) => {
    const companyTitle = req.params.companyTitle;
    try {
        const companyProfile = await Company.find({
            companyTitle
        });
        if(!companyProfile.length){
            res.status(404);
            throw new Error("No company found for the given company title");
        } 
        res.status(200).json(companyProfile);
    } catch (error) {
        res.status(500)
        .json({
            message: "Error fetching comapny by company title",
            error: error.message,
        })
    }
})


export {
    createCompanyProfile,
    getCompanyProfile
};