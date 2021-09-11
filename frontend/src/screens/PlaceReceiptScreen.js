import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap-v5'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutStepsAdmin from '../components/CheckoutStepsAdmin'
import { createReceipt } from '../actions/receiptActions'
import { RECEIPT_CART_CLEAR_ITEMS } from '../constants/receiptConstants'

const PlaceReceiptScreen = ({ history }) => {
    const dispatch = useDispatch()

    const receiptCart = useSelector((state) => state.receiptCart)

    if (!receiptCart.supplier.address) {
        history.push('/admin/supplier')
    }
    //   Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    receiptCart.itemsPrice = addDecimals(
        receiptCart.receiptItems.reduce((acc, item) => acc + item.importPrice * item.qty, 0)
    )
    receiptCart.shippingPrice = addDecimals(receiptCart.itemsPrice > 100 ? 0 : 10)

    receiptCart.totalPrice = (
        Number(receiptCart.itemsPrice) +
        Number(receiptCart.shippingPrice)
    ).toFixed(2)

    const receiptCreate = useSelector((state) => state.receiptCreate)
    const { receipt, success, error } = receiptCreate

    useEffect(() => {
        if (success) {
            history.push(`/admin/receipt/${receipt._id}`)

            dispatch({ type: RECEIPT_CART_CLEAR_ITEMS })
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(
            createReceipt({
                receiptItems: receiptCart.receiptItems,
                supplier: receiptCart.supplier,
                shippingPrice: receiptCart.shippingPrice,
                itemsPrice: receiptCart.itemsPrice,
                totalPrice: receiptCart.totalPrice,
            })
        )
    }

    return (
        <>
            <CheckoutStepsAdmin step1 step2 step3 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Supplier Information</h2>
                            <p>
                                <strong> Name  : </strong>
                                {" "}{receiptCart && receiptCart.supplier && receiptCart.supplier.name}
                            </p>
                            <p>
                                <strong> Phone :</strong>
                                {" "}{receiptCart && receiptCart.supplier && receiptCart.supplier.phone}
                            </p>
                            <p>
                                <strong> Address:</strong>
                                {" "}{receiptCart && receiptCart.supplier && receiptCart.supplier.address}, {receiptCart && receiptCart.supplier && receiptCart.supplier.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Receipt Items</h2>
                            {receiptCart && receiptCart.receiptItems && receiptCart.receiptItems.length === 0 ? (
                                <Message>Your receipt is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {receiptCart && receiptCart.receiptItems && receiptCart.receiptItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.importPrice} = ${item.qty * item.importPrice}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Receipt Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${receiptCart && receiptCart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${receiptCart && receiptCart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${receiptCart && receiptCart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {error && (
                                <ListGroup.Item>
                                    {<Message variant='danger'>{error}</Message>}
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Row>
                                    <Button
                                        type='button'
                                        className='btn-block'
                                        disabled={receiptCart && receiptCart.receiptItems === 0}
                                        onClick={placeOrderHandler}
                                    >
                                        Place Order
                                    </Button>
                                </Row>

                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceReceiptScreen
