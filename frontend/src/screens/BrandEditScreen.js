import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap-v5'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listBrandDetails, updateBrand } from '../actions/brandActions'
import { BRAND_DETAILS_RESET, BRAND_UPDATE_RESET } from '../constants/brandConstants'

const BrandEditScreen = ({ match, history }) => {
    const brandId = match.params.id

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const brandDetails = useSelector(state => state.brandDetails)
    const { loading, error, brand } = brandDetails

    const brandUpdate = useSelector(state => state.brandUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = brandUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: BRAND_UPDATE_RESET })
            dispatch({ type: BRAND_DETAILS_RESET })
            history.push('/admin/brandlist')
        } else {

            if (!brand || brand._id !== brandId ) {
                console.log('brand')
                dispatch(listBrandDetails(brandId))

            } else {
                setName(brand.name)
                setDescription(brand.description)
            }
        }

    }, [dispatch, history, brandId, brand, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (name.trim() === "") {
            setMessage('Name must not be empty !')
        }
        else if (description.trim() === "") {
            setMessage('Description must not be empty !')
        }

        else {
            dispatch(updateBrand(brandId, name, description))
        }
    }

    return (
        <>
            <Link to='/admin/brandlist' className='btn btn-light my-3'> Go Back </Link>

            <FormContainer>
                <h1>Edit Brand</h1>
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

export default BrandEditScreen