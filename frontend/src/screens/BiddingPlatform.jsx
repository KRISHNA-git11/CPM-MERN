import React from 'react'
import BidForm from '../components/BidForm'
import BidDashboard from './BidDashboard'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const BiddingPlatform = () => {

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault()
    navigate('/newbid');
  }

  return (
    <div>
        {/* Create your bids header */}
        {/* <BidForm /> */}

        <div>
          <Button onClick={e => handleClick(e)} > Create a New Bid</Button>
        </div>
        
        <BidDashboard />
        

    </div>
  )
}

export default BiddingPlatform