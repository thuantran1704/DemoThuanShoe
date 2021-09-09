import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap-v5'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listCategoryDetails, updateCategory } from '../actions/categoryActions'
import { CATEGORY_DETAILS_RESET, CATEGORY_UPDATE_RESET } from '../constants/categoryConstants'

const CategoryEditScreen = ({ match, history }) => {
    const categoryId = match.params.id

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const categoryDetails = useSelector(state => state.categoryDetails)
    const { loading, error, category } = categoryDetails

    const categoryUpdate = useSelector(state => state.categoryUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = categoryUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET })
            dispatch({ type: CATEGORY_DETAILS_RESET })
            history.push('/admin/categorylist')
        } else {

            if (!category || category._id !== categoryId) {
                dispatch(listCategoryDetails(categoryId))

            } else {
                setName(category.name)
                setDescription(category.description)
            }
        }

    }, [dispatch, history, categoryId, category, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (name.trim() === "") {
            setMessage('Name must not be empty !')
        }
        else if (description.trim() === "") {
            setMessage('Description must not be empty !')
        }
        else {
            dispatch(updateCategory(categoryId, name, description))
        }
    }

    return (
        <>
            <Link to='/admin/categorylist' className='btn btn-light my-3'> Go Back </Link>

            <FormContainer>
                <h1>Edit Category</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
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

                                    <Button type='submit' variant='primary'>
                                        Update
                                    </Button>
                                </Form>
                            </>
                        )
                }
            </FormContainer>
        </>
    )
}

export default CategoryEditScreen