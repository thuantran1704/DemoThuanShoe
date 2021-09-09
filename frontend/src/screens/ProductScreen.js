import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { Carousel, Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap-v5' //
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Product from '../components/Product'
import Slider from "react-slick";
import { listProductDetails, createProductReview, listSameProductsByBrand } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_REVIEW_SUCCESS } from '../constants/productConstants'
import Navigation from '../components/Navigation'

const ProductScreen = ({ history, match }) => {
    const sizeF = [
        '36',
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
    ]

    const ratingChanged = (newRating) => {
        setRating(newRating)
    }

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [size, setSize] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productSame = useSelector(state => state.productSame)
    const { loading: loading1, error: error1, products: productsTopRatedByBrand } = productSame

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading: loadingProductReview, error: errorProductReview, success: successProductReview } = productReviewCreate


    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
        autoplaySpeed: 2000,
        pauseOnFocus: true,
        swipeToSlide: true
    };

    useEffect(() => {
        if (!product || product._id !== match.params.id) {
            dispatch(listProductDetails(match.params.id))
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        if (successProductReview) {
            alert('Review Submited !')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })

        }
        if (product && product.name) {
            const temp = product.brand.name
            dispatch(listSameProductsByBrand(temp))
        }

    }, [dispatch, match, successProductReview, product])
    //rõ ràng true;v, dô đây luôn :v
    const addToCartHandler = () => {

        history.push(`/cart/${match.params.id}?qty=${qty}&size=${size}`)
        //  &size=${size}
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, { rating, comment }))
    }

    return (
        <>
            <Navigation />

            {
                loading
                    ? <Loader />
                    : error
                        ? <Message variant='danger' > {error} <Link to='/'>
                            Go back
                        </Link></Message>
                        : (
                            <>

                                <Meta title={product.name} />
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                                    <li class="breadcrumb-item">Product</li>
                                    <li class="breadcrumb-item active">{product.name}</li>
                                </ol>
                                <Row>
                                    <Col md={5} >
                                        <Row>


                                            <Carousel
                                                className="carousel carousel-dark slide"
                                                time={1500}
                                                automatic={true}
                                                slideNumber={true}
                                                dots={true}
                                                slideImageFit="cover"
                                                thumbnails={true}
                                                thumbnailWidth="100px"
                                                pauseIconColor="white"
                                                pauseIconSize="40px"
                                                pause='hover'
                                                variant="dark">
                                                {product.images && product.images[0] &&
                                                    <Carousel.Item interval={1800}>
                                                        <Image src={product.images && product.images[0] && product.images[0].url} alt={product.name} thumbnail />
                                                    </Carousel.Item>
                                                }
                                                {product.images && product.images[2] &&
                                                    <Carousel.Item interval={1800}>
                                                        <Image src={product.images && product.images[2] && product.images[2].url} alt={product.name} thumbnail />
                                                    </Carousel.Item>
                                                }
                                                {product.images && product.images[1] &&
                                                    <Carousel.Item interval={1800}>
                                                        <Image src={product.images && product.images[1] && product.images[1].url} alt={product.name} thumbnail />
                                                    </Carousel.Item>
                                                }
                                                {product.images && product.images[3] &&
                                                    <Carousel.Item interval={1800}>
                                                        <Image src={product.images && product.images[3] && product.images[3].url} alt={product.name} thumbnail />
                                                    </Carousel.Item>
                                                }
                                            </Carousel>
                                        </Row>
                                    </Col>

                                    <Col md={1} />

                                    <Col md={5}>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <h3>{product.name}</h3>
                                            </ListGroup.Item>

                                            <ListGroup.Item style={{ padding: "12px" }}>
                                                <Rating
                                                    value={product.rating}
                                                    text={`${product.numReviews} reviews`} />
                                            </ListGroup.Item>

                                            <ListGroup.Item style={{ padding: "12px" }}>
                                                Price : ${product.price}
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Decription :
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>{product.description}</Col>
                                                </Row>

                                            </ListGroup.Item>

                                            <ListGroup.Item style={{ padding: "12px" }}>
                                                <Row>
                                                    <Col>
                                                        {`Status : ${product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}`}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Quantity :</Col>
                                                        <Col>
                                                            <Form.Control
                                                                as='select' value={qty}
                                                                onChange={(e) => setQty(e.target.value)}>
                                                                {
                                                                    [...Array(product.countInStock).keys()].map(x => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Size :</Col>
                                                    <Col>
                                                        <Form.Control
                                                            as='select' value={size}
                                                            onChange={(e) => setSize(e.target.value)}>
                                                            {
                                                                sizeF.map(s => (
                                                                    <option key={s} value={s}>
                                                                        {s}
                                                                    </option>
                                                                ))
                                                            }

                                                            {!size && setSize("36")}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        <Button
                                                            onClick={addToCartHandler}
                                                            className='btn-block'
                                                            type='button'
                                                            disabled={product.countInStock === 0}>
                                                            Add to cart
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                        </ListGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={5}>
                                        <h2>Customer Reviews</h2>
                                        {product.reviews.length === 0 && <Message>No Reviews</Message>}
                                        <ListGroup variant='flush'>
                                            {product.reviews.map(review => (
                                                <ListGroup.Item key={review._id}>
                                                    <strong>{review.name}</strong>
                                                    <Rating value={review.rating} />
                                                    <p>{review.createdAt.substring(0, 10)}</p>
                                                    <p>{review.comment}</p>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>

                                        <ListGroup variant='flush'>
                                            {
                                                loadingProductReview ? <Loader />
                                                    : errorProductReview ? <Message variant='danger'> {errorProductReview} </Message>
                                                        : (
                                                            <>
                                                                <h2>Write YOUR Review</h2>
                                                                <ListGroup.Item>
                                                                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                                                    {userInfo
                                                                        ? (
                                                                            <Form onSubmit={submitHandler}>
                                                                                <Form.Group controlId='rating'>
                                                                                    <Form.Label>Rating</Form.Label>

                                                                                    <ReactStars
                                                                                        count={5}
                                                                                        half={false}
                                                                                        value={rating}
                                                                                        onChange={ratingChanged}
                                                                                        size={50}
                                                                                        color2={'#ffd700'} />
                                                                                </Form.Group>
                                                                                <Form.Group controlId='comment'>
                                                                                    <Form.Label>Comment</Form.Label>
                                                                                    <Form.Control
                                                                                        as='textarea'
                                                                                        value={comment}
                                                                                        onChange={(e) => setComment(e.target.value)}>

                                                                                    </Form.Control>
                                                                                </Form.Group>
                                                                                <Button type='submit' variant='primary'>
                                                                                    Submit
                                                                                </Button>
                                                                            </Form>
                                                                        )
                                                                        : <Message> Please <Link to='/login'> Sign in </Link> to write a review {' '} </Message>}
                                                                </ListGroup.Item>
                                                            </>
                                                        )
                                            }

                                        </ListGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        loading1 ? <Loader />
                                            : error1 ? <Message variant='danger'> {error1} </Message>
                                                : (
                                                    <>
                                                        <h2>YOU MIGHT ALSO LOVE</h2>
                                                        <Row>
                                                            <Slider {...settings}>
                                                                {productsTopRatedByBrand.map((product) => (
                                                                    <Row>
                                                                        <Col key={product._id}>
                                                                            <Product product={product} />
                                                                        </Col>
                                                                        <Col md={1} />
                                                                    </Row>
                                                                ))}
                                                            </Slider>
                                                        </Row>
                                                    </>
                                                )
                                    }
                                </Row>

                            </>
                        )
            }

        </>
    )
}

export default ProductScreen
