import expressAsyncHandler from "express-async-handler";
import Bid from "../models/bidModel.js";


/**
 * 
*/
const createBid = expressAsyncHandler( async(req, res) => {
    const { projectTitle, projectDescription, address, city, state, zip, type, startDate, posterName, posterEmail, posterCompany} = req.body
    try {
        console.log(req)
        const filesData = req.files.map(file => ({
          filename: file.filename,
          title: projectTitle + " " + file.originalname,
        }));

        const bid = await Bid.create({
          projectTitle,
          projectDescription,
          address,
          city,
          state,
          zip,
          type,
          startDate,
          posterName, 
          posterEmail, 
          posterCompany,
          files: filesData
        })

        if(bid){
          res.status(200).json({
              _id: bid._id,
              bidTitle : bid.projectTitle,
          })
        } else {
          res.status(400)
          throw new Error("Bid creation failed")
        }
    } catch (e) {
        throw new Error(e);
    }
})


const deleteBidByName = expressAsyncHandler(async(req, res) => {
  const bidName = req.params.bidName;

  try {
    // Find the bid by name
    const bid = await Bid.findOne({ projectTitle: bidName });

    if (!bid) {
      res.status(404);
      throw new Error("Bid not found");
    }

    // Delete the bid
    await bid.remove();

    res.status(200).json({ message: "Bid deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bid", error: error.message });
  }
})

const editBidByName = expressAsyncHandler(async(req, res) => {
  const bidName = req.params.bidName;
  const {
    projectTitle,
    projectDescription,
    address,
    city,
    state,
    zip,
    type,
    startDate,
  } = req.body;

  try {
    // Find the bid by name
    const bid = await Bid.findOne({ projectTitle: bidName });

    if (!bid) {
      res.status(404);
      throw new Error("Bid not found");
    }

    // Update bid properties
    bid.projectTitle = projectTitle || bid.projectTitle;
    bid.projectDescription = projectDescription || bid.projectDescription;
    bid.address = address || bid.address;
    bid.city = city || bid.city;
    bid.state = state || bid.state;
    bid.zip = zip || bid.zip;
    bid.type = type || bid.type;
    bid.startDate = startDate || bid.startDate;

    // Save the updated bid
    const updatedBid = await bid.save();

    res.status(200).json({ message: "Bid updated successfully", updatedBid });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating bid", error: error.message });
  }
})

const getAllActiveBids = expressAsyncHandler(async (req, res) => {
  try {
    const activeBids = await Bid.find({ isActive: true });

    res.status(200).json(activeBids);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching active bids", error: error.message });
  }
});

const getBidsByProjectTitle = expressAsyncHandler(async (req, res) => {
  const projectTitle = req.params.projectTitle;

  try {
    const bidsByTitle = await Bid.find({ projectTitle });

    if (!bidsByTitle.length) {
      res.status(404);
      throw new Error("No bids found for the given project title");
    }

    res.status(200).json(bidsByTitle);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching bids by project title",
        error: error.message,
      });
  }
});

const getBidsById = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const bidByid = await Bid.findById(id);

    if (!bidByid) {
      res.status(404);
      throw new Error("No bids found for the given project id");
    } 

    res.status(200).json(bidByid);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching bids by project id",
        error: error.message,
      });
  }
});




export {
    createBid,
    deleteBidByName,
    editBidByName,
    getBidsById,
    getAllActiveBids,
    getBidsByProjectTitle,
};