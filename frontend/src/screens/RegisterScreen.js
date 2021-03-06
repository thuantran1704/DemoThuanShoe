import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form } from 'react-bootstrap-v5'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import Navigation from '../components/Navigation'

const RegisterScreen = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [phone, setPhone] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search
        ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        // Dispatch Register
        if (phone.length !== 10) {
            setMessage('Phone number is not in the correct format !')
        }
        else if (password !== confirmPassword) {
            setMessage('Password do not match !')
        } else {
            dispatch(register(name, email, password, birthday, phone))
        }
    }

    return (
        <>
            <Navigation />

            <FormContainer>
                <h1>Sign Up</h1>
                {message && <Message variant='danger'> {message} </Message>}
                {error && <Message variant='danger'> {error} </Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name}
                            onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='phone'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type='number' placeholder='Enter your phone number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='birthday'>
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type='date' placeholder='Enter your birthday' value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email}
                            onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>


                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password}
                            onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='comfirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm password' value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Register
                    </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        Have an Account ?{' '}
                        <Link to={redirect
                            ? `/login?redirect=${redirect}`
                            : '/login'}> Login </Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default RegisterScreen