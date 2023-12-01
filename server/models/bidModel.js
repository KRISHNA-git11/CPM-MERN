import mongoose from "mongoose";

// projectTitle, projectDescription, locationDetails, startDate, 
// address, city, state, zip 

const bidSchema = mongoose.Schema ({
    projectTitle : {
        type: String,
        required: true,
        trim: true
    },
    projectDescription : {
        type: String,
        required: true,
        trim: true
    },
    address :{
        type: String,
        required: true,
        trim: true
    },
    city : {
        type: String,
        required: true,
        trim: true
    },
    state : {
        type: String,
        required: true,
        trim: true
    },
    zip : {
        type: Number,
        required: true,
        trim: true
    },
    type : {
        type: String,
        enum: ["IFB", "RFQ", "RFP"],
        required: true,
        trim: true
    },
    startDate : {
        type: Date,
        required: true,
        trim: true
    },

    isActive : {
        type: Boolean,
        // required: true
        default: true
    },

    posterName :{
        type: String,
        required: true,
        trim: true
    },
    posterEmail : {
        type: String,
        required: true,
        trim: true
    },

    posterCompany : {
        type: String,
        required: true,
        trim: true
    },
    
    files: [
        {
            filename: {
                type: String,
                required: true,
                trim: true
            },
            title: {
                type: String,
                required: true,
                trim: true
            },
            // Add other file-related properties as needed
        }
    ]

})

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;