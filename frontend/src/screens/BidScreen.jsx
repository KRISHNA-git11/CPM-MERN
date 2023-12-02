import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetBidByTitleQuery } from '../slices/bidApiSlice'
import Loader from '../components/Loader'
import PdfViewer from '../components/PdfViewer'
import { Button, Modal } from 'react-bootstrap'

function BidScreen() {
    const [bidId, setBidId] = useState("")
    const [filename, setFilename] = useState("")
    const [lgShow, setLgShow] = useState(false)
    const { id } = useParams()
    useEffect( () => {
        setBidId(id)
        // setFilename(bid.files[0].filename)
    }, [bidId, filename])
    const {data: bid, error, isLoading } =  useGetBidByTitleQuery(useParams().id)

    const handleClick = (e, filename) => {
      e.preventDefault();
      setFilename(filename)
      setLgShow(true)
    }
    

    return (
        <div>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div>Error loading bid: {error}</div>
          ) : bid ? (
            <div>
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
                <p>Company: <a href={'http://localhost:3000/company/' + bid.posterCompany + "/656a74ef9210ffa4c9233b86"} >{bid.posterCompany}</a></p>
              </div>
              <div>
                <div>
                  <h4>View files</h4>
                  {bid.files ? bid.files.map((file) => {
                    return <Button className='m-1' variant="secondary" onClick={e => handleClick(e, file.filename)} > {file.filename} </Button>
                  }) : null}
                </div>
              <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        {filename}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PdfViewer documentPath={"http://localhost:8888/files/projectFiles/" + filename} />  
                    </Modal.Body>
                  </Modal>
              </div>

             </div>
          ) : (
            <div>No bid found with the specified ID.</div>
          )}
        </div>
      );
}

export default BidScreen