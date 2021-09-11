import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form} from 'react-bootstrap-v5'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createCategory } from '../actions/categoryActions'
import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants'

const CategoryCreateScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()

    const categoryCreate = useSelector(state => state.categoryCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate } = categoryCreate

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: CATEGORY_CREATE_RESET })
            history.push('/admin/categorylist')
        }
    }, [dispatch, history, successCreate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (name.trim() === "") {
            setMessage('Name must not be empty !')
        }
        else if (description.trim() === "") {
            setMessage('Description must not be empty !')
        }
        else {
            dispatch(createCategory(name, description))
        }
    }

    return (
        <>

            <Link to='/admin/categorylist' className='btn btn-light my-3'> Go Back </Link>
            <FormContainer>
                <h1>Create Category</h1>
                {loadingCreate ? <Loader />
                    : errorCreate ? <Message variant='danger'>{errorCreate}</Message>
                        : (
                            <>
                                {message && <Message variant='danger'> {message} </Message>}
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type='name' placeholder='Enter name' value={name}
                                            onChange={(e) => setName(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='description'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as='textarea' type='text' placeholder='Enter description' value={description}
                                            onChange={(e) => setDescription(e.target.value)}></Form.Control>
                                    </Form.Group>

                                   
                               
                                    <br></br>
                                    <Button className="btn btn-primary" type='submit' variant='primary'
                                    >
                                        Create
                                    </Button>
                                </Form>
                            </>
                        )}
            </FormContainer>

        </>
    )

}

export default CategoryCreateScreen