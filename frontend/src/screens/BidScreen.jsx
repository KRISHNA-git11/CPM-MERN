import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetBidByTitleQuery } from '../slices/bidApiSlice'
import Loader from '../components/Loader'

function BidScreen() {
    const [bidId, setBidId] = useState("")
    const { id } = useParams()
    useEffect( () => {
        setBidId(id)
    }, [bidId])

    console.log(bidId)
    const {data: bid, error, isLoading } =  useGetBidByTitleQuery(useParams().id)
    

    return (
        <div>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div>Error loading bid: {error}</div>
          ) : bid ? (
            <div>
              <h1>Project: {bid.projectTitle}</h1>
              <h3>Posted By: {bid.posterName}</h3>
              <p>Description: {bid.projectDescription}</p>
              <p>Address: {bid.address}</p>
              <p>City: {bid.city}</p>
              <p>State: {bid.state}</p>
              <p>ZIP: {bid.zip}</p>
              <p>Type: {bid.type}</p>
              <p>Start Date: {new Date(bid.startDate).toLocaleString()}</p>
              <p>Active: {bid.isActive ? 'Yes' : 'No'}</p>
              <p>Email: {bid.posterEmail}</p>
              <p>Company: {bid.posterCompany}</p>
            </div>
          ) : (
            <div>No bid found with the specified ID.</div>
          )}
        </div>
      );
}

export default BidScreen