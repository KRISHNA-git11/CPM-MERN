import React from 'react';
import { useGetAllBidsQuery } from '../slices/bidApiSlice';
import Loader from '../components/Loader';
import formatDateTime from '../../utils/helpers';

const BidDashboard = () => {
  const { data: bids, error, isLoading } = useGetAllBidsQuery();

  console.log(bids)
  
  return (

    isLoading ? <Loader /> : 
    <div>
      <h3>Available Bids</h3>
      
      {bids.map((bid, index) => (
        <div key={index}  className="card m-2">
          <div className="card-body">
            <h5 className="card-title">{bid.projectTitle}</h5>
            <p className="card-text">{bid.projectDescription}</p>
            <p>Start Date: {formatDateTime(bid.startDate)}</p>
            {/* <p>No. of Bidders: {bid.noOfBidders}</p> */}
            <a href={"/bid/" + bid._id}>View Bid</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BidDashboard;
