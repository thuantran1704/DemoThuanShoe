import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Image, ListGroup, Button, Form } from 'react-bootstrap-v5'
import Message from '../components/Message.js'
import { addToReceiptCart, removeFromReceiptCart } from '../actions/receiptActions'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';


function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const ReceiptCartScreen = ({ match, location, history }) => {
    const productId = match.params.id
    const [qty, setQty] = useState(1)
    const [importPrice, setImportPrice] = useState(1)

    const dispatch = useDispatch()

    const receiptCart = useSelector(state => state.receiptCart)
    const { receiptItems } = receiptCart

    useEffect(() => {
        if (productId) {
            dispatch(addToReceiptCart(productId, importPrice, qty))
        }
    }, [dispatch, productId])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromReceiptCart(id))
    }

    var flag = false

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const checkPrice = () => {
        receiptItems.forEach(item => {
            if (item.price < item.importPrice) {
                flag = true
            }
        });

        if (flag === true) {
            setOpen(true)
        }
        else {
            history.push('/login?redirect=admin/supplier')
        }
    }

    const checkoutHandler = () => {
        setOpen(false);
        history.push('/login?redirect=admin/supplier')
    }

    return (
        <Row>
            <Col md={9}>
                <h1>Receipt Cart</h1>
                {receiptItems.length === 0 ? (
                    <Message>
                        Your receipt cart is empty <Link to='/admin/productlist'>Go Back</Link>
                    </Message>
                ) : (
                    <>
                        <ListGroup variant='flush'>

                            <ListGroup.Item >
                                <Row>
                                    <Col md={4} >
                                        <div style={{ marginLeft: "12%" }} >Product</div>
                                    </Col>

                                    <Col md={2} > <div style={{ marginLeft: "10%" }}>Sales Price</div></Col>
                                    <Col md={2} > <div style={{ marginLeft: "10%" }}>Import Price</div></Col>
                                    <Col md={2} >
                                        <div style={{ marginLeft: "20%" }}>Quantity</div>
                                    </Col>

                                </Row>

                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup variant='flush'>
                            {receiptItems.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={4} style={{ marginTop: "3%" }}>
                                            <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>{item.name}</Link>
                                        </Col>

                                        <Col md={2} style={{ marginTop: "5%", marginLeft: "2%" }}>${item.price}</Col>

                                        <Col md={2} style={{ marginTop: "4%" }}>
                                            <Form.Control
                                                type='number'
                                                min="1"
                                                placeholder='Enter Import Price'
                                                value={item.importPrice}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToReceiptCart(item.product, Number(e.target.value), item.qty)
                                                    )
                                                }>
                                            </Form.Control>
                                        </Col>

                                        <Col md={2} style={{ marginTop: "4%", marginLeft: "2%" }}>
                                            <Form.Control
                                                type='number' placeholder='Enter Quantity'
                                                min="1"
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToReceiptCart(item.product, item.importPrice, Number(e.target.value))
                                                    )
                                                }>
                                            </Form.Control>
                                        </Col>

                                        <Col md={1} style={{ marginTop: "4%" }}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>

                                </ListGroup.Item>
                            ))}

                            <ListGroup.Item>
                                <Row>
                                    <Col md={5} />
                                    <Col>
                                        <Link to='/admin/productlist'>Keep Import Goods</Link>

                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </>
                )}
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({receiptItems.reduce((acc, item) => acc + item.qty, 0)}) items
                            </h2>
                            $
                            {receiptItems
                                .reduce((acc, item) => acc + item.qty * item.importPrice, 0)
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>

                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={receiptItems.length === 0}
                                    onClick={checkPrice}
                                >
                                    Proceed To Checkout
                                </Button>

                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    PaperComponent={PaperComponent}
                                    aria-labelledby="draggable-dialog-title"
                                >
                                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                        Warning
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            This Receipt Order has Sales Price lower than Import Price ! <br />
                                            Are you sure to submit that ?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button autoFocus onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={checkoutHandler} color="primary">
                                            Submit
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Row>

                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default ReceiptCartScreen
