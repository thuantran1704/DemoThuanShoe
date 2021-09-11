import React from 'react'
import { Card } from 'react-bootstrap-v5'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.images[0].url} className='photo' variant='top'></Card.Img>
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }} >
                    <Card.Title as='div'  >
                        <strong >
                            <div style={{
                            height: '50px',
                            overflow: 'hidden',
                            marginBottom: '3px',
                        }}>{product.name}</div>
                            </strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>

                <Card.Text as='h3'>
                    ${(product.price).toFixed(2)}
                </Card.Text>
            </Card.Body>
        </Card >
    )
}

export default Product
