import React, { useState } from 'react'
import FormContainer from './FormContainer'
import { Form, Button } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateBidMutation } from '../slices/bidApiSlice';
import { useSelector } from 'react-redux';

const BidForm = () => {
    const [projectTitle, setProjectTitle] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState(null);
    const [step, setStep] = useState(1);
    const [type, setType] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [files, setFiles] = useState([]);

    const { userInfo } = useSelector((state) => state.auth);

    const stateCodes = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
      ];

    const nextStep = () => {
        setStep(step + 1);
    }

    const prevStep = () => {
        setStep(step - 1);
    }

    const handleChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
    }


    const [ createBid, {isLoading}] = useCreateBidMutation();
    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(files)
        const formData = new FormData();
        formData.append('projectTitle', projectTitle)
        formData.append('projectDescription', projectDescription)
        formData.append('address', address)
        formData.append('city', city)
        formData.append('state', state)
        formData.append('zip', zip)
        formData.append('startDate', startDate)
        formData.append('type', type)
        formData.append('posterName', userInfo.name)
        formData.append('posterEmail', userInfo.email)
        formData.append('posterCompany', "USCIS")
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        formData.append('isActive', true)
        try {
            const res = await createBid(formData).unwrap();
            console.log(res);
    } catch (err) {
            toast.error(err?.data?.message || err.error)
        }

    }

    switch(step) {
        case 1 :
            return (    
                <div>
                    <FormContainer>
                    <h1>Bid Details</h1>
                    <Form.Group className='my-2' controlId='projectTitle'>
                    <Form.Label >Project Title</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter Project Title'
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2' controlId='projectDescription'>
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control
                        type='textarea'
                        as="textarea"
                        placeholder='Enter Project Description'
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                    ></Form.Control>
                    </Form.Group>
                    
                    <Form.Group className='my-2' controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter your address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2' controlId='address'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter your city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2' controlId='state'>
                    <Form.Label>State</Form.Label>
                    <Form.Control onChange={e => setState(e.target.value)} as="select" value={state}
                name='state' >
                                <option disabled value="">
                                    Select State
                                </option>
                                {stateCodes.map(option => (
                                    <option value={option} key={option}>{option}</option>
                                ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2' controlId='address'>
                    <Form.Label>ZIP</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter your ZIP'
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                    ></Form.Control>
                    </Form.Group>
            
                    </FormContainer>
                    <div className='col-md-6 col-12 m-auto' >
                        <Button disabled onClick={prevStep} variant='secondary' className='primary mx-2 my-2' >
                            Previous
                        </Button>
                        <Button onClick={nextStep}  variant='primary' className='primary mx-2 my-2' >
                            Next
                        </Button>
                    </div>
                </div>
            )

        case 2 :
            return (
                <div>
                    <FormContainer>
                    <h1>Plans and Specifications</h1>
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Upload Project Plans and Specifications</Form.Label>
                        <Form.Control onChange={e => setFiles(Array.from(e.target.files)) }  multiple type="file" />
                    </Form.Group>
                    <Form.Group controlId="custom-select" className="mb-3" >
                        <Form.Label>Select Bid Solicitation Type</Form.Label>
                        <Form.Control onChange={e => setType(e.target.value)} value={type} as="select" >
                                <option value="">
                                    Select Type
                                </option>
                                {["IFB", "RFQ", "RFP"].map(option => (
                                    <option key={option}>{option}</option>
                                ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label className='mr-3' >Set Bid Opening Date and Time</Form.Label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                        className="ml-3"
                        />
                    </Form.Group>
                    </FormContainer>
                    <div className='col-md-6 col-12 m-auto' >
                        <Button onClick={prevStep} variant='secondary' className='primary mx-2 my-2' >
                            Previous
                        </Button>
                        <Button onClick={e => submitHandler(e)} variant='primary' className='primary mx-2 my-2' >
                            Submit Bid
                        </Button>
                    </div>
                </div>
            )
    }    
}
export default BidForm



