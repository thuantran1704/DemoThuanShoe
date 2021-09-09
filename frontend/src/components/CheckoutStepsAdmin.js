import React from 'react'
import { Nav } from 'react-bootstrap-v5'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutStepsAdmin = ({ step1, step2, step3 }) => {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1
                    ? (<LinkContainer to='/login'>
                        <Nav.Link>Is Admin</Nav.Link>
                    </LinkContainer>)
                    : <Nav.Link disabled>Is Admin</Nav.Link>
                }
            </Nav.Item>

            <Nav.Item>
                {step2
                    ? (<LinkContainer to='/shipping'>
                        <Nav.Link>Supplier</Nav.Link>
                    </LinkContainer>)
                    : <Nav.Link disabled>Supplier</Nav.Link>
                }
            </Nav.Item>

           

            <Nav.Item>
                {step3
                    ? (<LinkContainer to='/placeorder'>
                        <Nav.Link>Place Receipt</Nav.Link>
                    </LinkContainer>)
                    : <Nav.Link disabled>Place Receipt</Nav.Link>
                }
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutStepsAdmin
