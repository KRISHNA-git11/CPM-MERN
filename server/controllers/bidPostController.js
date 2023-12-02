import expressAsyncHandler from "express-async-handler";
import BidPosting from "../models/bidPostModel.js";
import Bid from "../models/bidModel.js";

const createBidPost = expressAsyncHandler(async(req, res) => {
    const {bidId, companyId, employeeName, expectedDeliveryDate} = req.body;


    const filesData = req.files.map(file => ({
        filename: file.filename,
        title:  file.originalname,
      }));


    const newPosting = {
        companyId: companyId,
        employeeName: employeeName,
        expectedDeliveryDate: expectedDeliveryDate,
        files: filesData
    }

    try {
        let bid = await Bid.findById(bidId);
        if(!bid) {
            res.status(404)
            throw new Error("Bid not found")
        }

        let bidPost = await BidPosting.findOne({bidId});
        if(!bidPost) {
            bidPost = await BidPosting.create({
                bidId,
                bidPostings: [newPosting]
            })
        } else {
            bidPost.bidPostings.push(newPosting);
            await bidPost.save();
        }

        res.status(200).json({
            _id: bidPost.bidId,
            postings: bidPost.bidPostings
        })

        
    } catch (error) {
        res.status(500).json({
            message: 'Error creating or updating BidPost',
            error: error.message,
          });
    }
})

const getAllBidsByBidId = expressAsyncHandler(async (req, res) => {
    const bidId = req.params.bidId;
    
})


export {
    createBidPost
}