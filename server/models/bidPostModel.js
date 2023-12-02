import mongoose from "mongoose";



const posting = mongoose.Schema({
    companyId : {
        type: String,
        require: true,
        trim: true
    },
    employeeName : {
        type : String,
        require: true,
        trim: true
    },
    expectedDeliveryDate : {
        type : Date,
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
        }
    ]
})

const bidPostSchema = mongoose.Schema({
    bidId : {
        type: String,
        require: true,
        trim: true
    },
    bidPostings : [posting]

})

const BidPosting = mongoose.model('BidPosting', bidPostSchema)

export default BidPosting;