import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap-v5'
import FormContainer from '../components/FormContainer'
import CheckoutStepsAdmin from '../components/CheckoutStepsAdmin'
import { saveSupplier } from '../actions/receiptActions'

const SupplierScreen = ({ history }) => {
    const receiptCart = useSelector(state => state.receiptCart)
    const { supplier } = receiptCart

    const [name, setName] = useState(supplier.name)
    const [address, setAddress] = useState(supplier.address)
    const [country, setCountry] = useState(supplier.country)
    const [phone, setPhone] = useState(supplier.phone)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveSupplier({ name, address, country, phone }))
        history.push('/admin/placeReceipt')
    }

    return (
        <FormContainer>
            <CheckoutStepsAdmin step1 step2 />
            <h1>Supplier</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>name</Form.Label>
                    <Form.Control type='text'
                        placeholder='Enter Supplier Name'
                        value={name} required
                        onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text'
                        placeholder='Enter Supplier Address'
                        value={address} required
                        onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text'
                        placeholder='Enter Supplier Country'
                        value={country} required
                        onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='phone'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type='number'
                        placeholder='Enter Supplier Phone Number'
                        value={phone} required
                        onChange={(e) => setPhone(e.target.value)}></Form.Control>
                </Form.Group>

                <br />
                <Row>
                   
                    <Col md={5} style={{marginLeft: "30 %"}}>
                        <Row>
                            <Button type='submit' variant='primary'>
                                Place Receipt
                            </Button>
                        </Row>
                    </Col>
                
                </Row>
            </Form>
        </FormContainer>
    )
}

export default SupplierScreen
