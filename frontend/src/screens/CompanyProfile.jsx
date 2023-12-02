import React, { useEffect, useState } from 'react'
import { useGetComapnyEmployeesQuery, useGetCompanyQuery } from '../slices/companyProfileApiSlice'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import img from '../assets/dummy.jpg'
import someImage from "../assets/placeholder.jpg"
import { Card, Carousel, Col, Container, Row, Button } from 'react-bootstrap'

const CompanyProfile = () => {

    const [title, setTitle] = useState("")
    useEffect( () => {
        setTitle(useParams.companyTitle)
        // setFilename(bid.files[0].filename)
    }, [title])
    const [company, setCompany] = useState("");
    const {data: companyProfile, error, isLoading } = useGetCompanyQuery(useParams().companyTitle)
    const {data: employees, isLoading2 } = useGetComapnyEmployeesQuery(useParams().id)

    return (
        <div>
            {isLoading ? (
            <Loader />
          ) : error ? (
            <div>Error loading bid: {error}</div>
          ) : companyProfile ? (
            
            <div>
                    <img style={{"height": "20rem", "width" : "100%"}} src={"http://localhost:8888/files/profileImages/" + companyProfile[0].profileImage} ></img>
                    <Container>
                        <Row>
                            <Col className='m-2' >
                                <div>
                                    <h1> Company Title : {companyProfile[0].companyTitle}</h1>
                                    <h3> Address: {companyProfile[0].companyAddress}</h3>
                                    <h3>Email: {companyProfile[0].companyEmail}</h3>
                                </div>
                            </Col>
                            <Col className='m-2' >
                                <div>
                                    <h1>
                                        Employees
                                    </h1>
                                    <Row className='' >
                                        <Col>
                                            <Card style={{ width: '18rem' }} className='mb-2' >
                                                <Card.Img variant="top" src={someImage} />
                                                <Card.Body>
                                                    <Card.Title>{employees[0].name}</Card.Title>
                                                    <Card.Text>
                                                    Some quick example text to build on the card title and make up the
                                                    bulk of the card's content.
                                                    </Card.Text>
                                                    <Button variant="primary">Profile</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card style={{ width: '18rem' }}>
                                                <Card.Img variant="top" src={someImage} />
                                                <Card.Body>
                                                    <Card.Title>{employees[1].name}</Card.Title>
                                                    <Card.Text>
                                                    Some quick example text to build on the card title and make up the
                                                    bulk of the card's content.
                                                    </Card.Text>
                                                    <Button variant="primary">Go somewhere</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row className='' >
                                        <Col>
                                            <Card style={{ width: '18rem' }}>
                                                <Card.Img variant="top" src={someImage} />
                                                <Card.Body>
                                                    <Card.Title>{employees[0].name}</Card.Title>
                                                    <Card.Text>
                                                    Some quick example text to build on the card title and make up the
                                                    bulk of the card's content.
                                                    </Card.Text>
                                                    <Button variant="primary">Go somewhere</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card style={{ width: '18rem' }}>
                                                <Card.Img variant="top" src={someImage} />
                                                <Card.Body>
                                                    <Card.Title>{employees[0].name}</Card.Title>
                                                    <Card.Text>
                                                    Some quick example text to build on the card title and make up the
                                                    bulk of the card's content.
                                                    </Card.Text>
                                                    <Button variant="primary">Go somewhere</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <h1>
                                Projects
                            </h1>
                            <Carousel className='w-75 m-auto' >
                            <Carousel.Item>
                                    <img src={someImage} className='w-100' ></img>
                                    <Carousel.Caption className='m-auto' >
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                <img src={someImage} className='w-100' ></img>
                                    <Carousel.Caption className='m-auto' >
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                <img src={someImage} className='w-100' ></img>
                                    <Carousel.Caption className='m-auto' >
                                    <h3>Third slide label</h3>
                                    <p>
                                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                    </p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </Row>
                    </Container>
                     
                    {/* <img src={'http://localhost:8888/files/profileImages/' + companyProfile.dummy.jpg } ></img> */}
            </div> 
          ) : (
            <div>No profiles found with the specified ID.</div>
          )}
        </div>
        
    )
}

export default CompanyProfile

