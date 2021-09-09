import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Col, Row, Image } from 'react-bootstrap-v5'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [images, setImages] = useState([])
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading] = useState(false)
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const brandList = useSelector(state => state.brandList)
    const { brands } = brandList
    const categoryList = useSelector(state => state.categoryList)
    const { categories } = categoryList

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand.brand)
                setImages(product.images)
                setCountInStock(product.countInStock)
                setCategory(product.category.category)
                setDescription(product.description)
            }
        }

    }, [dispatch, history, productId, product, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (name.trim() === "") {
            setMessage('Name must not be empty !')
        }
        else if (price <= 0) {
            setMessage('Price must be greater than 0 !')
        }
        else if (images.length === 0) {
            setMessage('Must have at least 1 image !')
        }
        else if (brand.trim() === "") {
            setMessage('Brand must not be empty !')
        }
        else if (category.trim() === "") {
            setMessage('Category must not be empty !')
        }
        // else if (countInStock < 0) {
        //     setMessage('Count In Stock must not be lower than 0 !')
        // }
        else if (description.trim() === "") {
            setMessage('Description must not be empty !')
        }
        else {
            dispatch(updateProduct(productId, name, price, images, brand, category, description))
        }

    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            return alert.error('File not exist!')
        }
        if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
            return alert.error('File format is incorrect!')
        }
        if (file.size > 1024 * 1024 * 5) {
            return alert.error('File too large!')
        }

        let formData = new FormData()
        formData.append('file', file)

        const res = await axios.post('/api/upload', formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        console.log(res.data);
        setImages(oldArray => [...oldArray, res.data])

    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'> Go Back </Link>

            <FormContainer>
                <h1>Edit Product</h1>
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

                                    <Row>
                                        <Col md={5}>
                                            <Form.Group controlId='price'>
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control type='number' placeholder='Enter price' value={price}
                                                min="1"
                                                    onChange={(e) => setPrice(e.target.value)}></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={1} />
                                        <Col md={5}>
                                            <Form.Group controlId='countInStock'>
                                                <Form.Label>Count In Stock</Form.Label>
                                                <Form.Control disabled type='number' placeholder='Enter Count In Stock' value={countInStock}
                                                    onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <br />

                                    {!images[0] ?
                                        (
                                            <>
                                                <Form.Group controlId='image1'>
                                                    <Form.Label>Image From Left</Form.Label>
                                                    <Form.Control type='text' placeholder='Enter image URL' value={images}
                                                        onChange={(e) => setImages[0](e.target.value)}></Form.Control>
                                                    <Form.File id='image-file'
                                                        // label='Choose Image'
                                                        custom
                                                        onChange={uploadFileHandler}>

                                                    </Form.File>
                                                </Form.Group>

                                            </>
                                        ) : (
                                            <>
                                                <Form.Group controlId='image1'>
                                                    <Form.Label>Image From Left</Form.Label>
                                                    <Image src={images[0].url} width="120" height="120" style={{ marginLeft: "20px" }} />
                                                </Form.Group>

                                            </>
                                        )}
                                    {uploading && <Loader />}

                                    {!images[1] ?
                                        (
                                            <>
                                                <Form.Group controlId='image2'>
                                                    <Form.Label>Image From Left</Form.Label>
                                                    <Form.Control type='text' placeholder='Enter image URL' value={images}
                                                        onChange={(e) => setImages[1](e.target.value)}></Form.Control>
                                                    <Form.File id='image-file'
                                                        // label='Choose Image'
                                                        custom
                                                        onChange={uploadFileHandler}>
                                                    </Form.File>
                                                </Form.Group>
                                            </>
                                        ) : (
                                            <>
                                                <Form.Group controlId='image2'>
                                                    <Form.Label>Image From Left</Form.Label>
                                                    <Image src={images[1].url} width="120" height="120" style={{ marginLeft: "20px" }} />
                                                </Form.Group>
                                            </>
                                        )}
                                    {uploading && <Loader />}


                                    {!images[2] ?
                                        (
                                            <>
                                                <Form.Group controlId='image2'>
                                                    <Form.Label>Image From Left</Form.Label>
                                                    <Form.Control type='text' placeholder='Enter image URL' value={images}
                                                        onChange={(e) => setImages[2](e.target.value)}></Form.Control>
                                                    <Form.File id='image-file'
                                                        custom
                                                        onChange={uploadFileHandler}>
                                                    </Form.File>
                                                </Form.Group>
                                            </>
                                        ) : (
                                            <>
                                                <Form.Group controlId='image2'>
                                                    <Form.Label>Image From Left</Form.Label>
                                                    <Image src={images[2].url} width="120" height="120" style={{ marginLeft: "20px" }} />
                                                </Form.Group>
                                            </>
                                        )}
                                    {uploading && <Loader />}

                                    {!images[3] ?
                                        (
                                            <>
                                                <Form.Group controlId='image2'>
                                                    <Form.Label>Image From Left</Form.Label>
                                                    <Form.Control type='text' placeholder='Enter image URL' value={images}
                                                        onChange={(e) => setImages[3](e.target.value)}></Form.Control>
                                                    <Form.File id='image-file'
                                                        // label='Choose Image'
                                                        custom
                                                        onChange={uploadFileHandler}>
                                                    </Form.File>
                                                </Form.Group>
                                            </>
                                        ) : (
                                            <>
                                                <Form.Group controlId='image2'>
                                                    <Form.Label>Image From Left</Form.Label>
                                                    <Image src={images[3].url} width="120" height="120" style={{ marginLeft: "20px" }} />
                                                </Form.Group>
                                            </>
                                        )}
                                    {uploading && <Loader />}
                                    <Row>
                                        <Col md={5}>
                                            <Form.Group controlId='brand'>
                                                <Form.Label>Brand</Form.Label>

                                                <Form.Select aria-label="Floating label select example" value={brand}
                                                    onChange={(e) => setBrand(e.target.value)}>

                                                    {brands && brands.map(brand => (
                                                        <option key={brand._id} value={brand._id}>{brand.name}</option>
                                                    ))}

                                                </Form.Select>

                                            </Form.Group>
                                        </Col>
                                        <Col md={1} />
                                        <Col md={5}>
                                            <Form.Group controlId='category'>
                                                <Form.Label>Category</Form.Label>

                                                <Form.Select aria-label="Floating label select example" value={category}
                                                    onChange={(e) => setCategory(e.target.value)}>

                                                    {categories && categories.map(category => (
                                                        <option value={`${category._id}`}>{category.name}</option>
                                                    ))}
                                                </Form.Select>

                                            </Form.Group>
                                        </Col>
                                    </Row>

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

export default ProductEditScreen