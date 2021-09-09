import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap-v5'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getReceiptDetails, cancelReceipt, receiveReceipt } from '../actions/receiptActions'
import { getUserDetail } from '../actions/userActions'
import { RECEIPT_CANCEL_RESET } from '../constants/receiptConstants'
import Meta from '../components/Meta'
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

const ReceiptScreen = ({ match, history }) => {
    const receiptId = match.params.id

    const dispatch = useDispatch()

    const receiptDetails = useSelector(state => state.receiptDetails)
    const { receipt, loading, error } = receiptDetails

    const receiptCancel = useSelector(state => state.receiptCancel)
    const { loading: loadingCancel, success: successCancel } = receiptCancel

    const receiptReceive = useSelector(state => state.receiptReceive)
    const { loading: loadingReceive, success: successReceive } = receiptReceive

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetail = useSelector(state => state.userDetail)
    const { user } = userDetail

    const [open, setOpen] = React.useState(false)
    const [openReceived, setOpenReceived] = React.useState(false)

    const [title, setTitle] = React.useState('')

    const handleClickOpen = () => {
        setOpen(true)
        setTitle("Are you sure you want to Cancel this Receipt ?")
    }

    const receivedHandleClickOpen = () => {
        setOpenReceived(true)
        setTitle("Are you sure you want to Mark as Received this Receipt ?")
    }

    const handleClose = () => {
        setOpen(false);
        setOpenReceived(false);
    };

    useEffect(() => {
        if (receipt && receipt.user) {
            dispatch(getUserDetail(receipt.user))
        }
        if (!userInfo) {
            history.push('/login')
        }

        if (!receipt || successCancel || successReceive || receipt._id !== receiptId) {
            dispatch({ type: RECEIPT_CANCEL_RESET })
            dispatch(getReceiptDetails(receiptId))
        }

    }, [dispatch, receiptId, successReceive, successCancel, receipt, userInfo, history])

    if (!loading) {
        // Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        receipt.itemsPrice = addDecimals(receipt.receiptItems.reduce(
            (acc, item) => Number((acc + item.importPrice * item.qty).toFixed(2)), 0))
    }

    const cancelHandler = () => {
        setOpen(false);
        dispatch(cancelReceipt(receipt))
    }

    const receivedHandler = () => {
        setOpenReceived(false);
        dispatch(receiveReceipt(receipt))
    }

    return (

        loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
                : <>
                    <Row>
                        <Col md={8}>
                            <h1>Receipt {receipt._id}</h1>
                            <Meta title={`${user.name}'s Receipt`} />
                        </Col>
                        {userInfo && userInfo.isAdmin &&
                            <Col md={4}>
                                <Row>
                                    <Link to='/admin/receiptlist' className='btn btn-dark my-3'> Go Back Receipt List</Link>
                                </Row>
                            </Col>
                        }

                    </Row>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Receipt Creator Information</h2>
                                    <p><strong>ID : </strong>{user._id}</p>
                                    <p><strong>Name : </strong> {user.name}</p>
                                    <p>
                                        <strong>Email : </strong>
                                        <a href={`mailto:${user.email}`}>{user.email}</a></p>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Supplier Information</h2>
                                    <p><strong>Name : </strong> {receipt.supplier.name}</p>
                                    <p>
                                        <strong> Phone :</strong>
                                        {" "}{receipt && receipt.supplier && receipt.supplier.phone}
                                    </p>
                                    <p>
                                        <strong>Address : </strong>
                                        {' '}{receipt.supplier.address},
                                        {' '}{receipt.supplier.country}

                                    </p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <p>
                                        Receipt Create At {receipt.orderAt.substring(0, 10)}
                                    </p>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Receipt Items</h2>
                                    {receipt.receiptItems.length === 0
                                        ? <Message>Your receipt is empty</Message>
                                        : (
                                            <ListGroup variant='flush'>
                                                {receipt.receiptItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>

                                                            <Col  >
                                                                <Row >
                                                                    <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>
                                                                        {item.name}
                                                                    </Link>
                                                                </Row>
                                                            </Col>
                                                            <Col md={4} >
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
                                            <Col>${receipt.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${receipt.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>

                                            <Col>${receipt.totalPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {/*--------------------- cancel order ---------------------*/}
                                    {loadingCancel && <Loader />}
                                    {receipt.status === "Ordered" && (
                                        <>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Button type='button' className='btn btn-block' color="primary" onClick={handleClickOpen}>
                                                        Cancel Order
                                                    </Button>
                                                    <Dialog
                                                        open={open}
                                                        onClose={handleClose}
                                                        PaperComponent={PaperComponent}
                                                        aria-labelledby="draggable-dialog-title"
                                                    >
                                                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                                            Confirm
                                                        </DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                {'     '}{title}{'     '}
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button autoFocus onClick={handleClose} color="primary">
                                                                No
                                                            </Button>
                                                            <Button onClick={cancelHandler} color="primary">
                                                                Yes
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </Row>

                                            </ListGroup.Item>
                                            <br />
                                            <ListGroup.Item>
                                                <Row>
                                                    <Button type='button' className='btn btn-block' onClick={receivedHandleClickOpen}>
                                                        Mark As Received
                                                    </Button>
                                                </Row>
                                                <Dialog
                                                    open={openReceived}
                                                    onClose={handleClose}
                                                    PaperComponent={PaperComponent}
                                                    aria-labelledby="draggable-dialog-title"
                                                >
                                                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                                        Confirm
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText>
                                                            {'     '}{title}{'     '}
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button autoFocus onClick={handleClose} color="primary">
                                                            No
                                                        </Button>
                                                        <Button onClick={receivedHandler} color="primary">
                                                            Yes
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </ListGroup.Item>
                                        </>
                                    )

                                    }

                                    {receipt.status === "Cancelled" && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    <Message variant='danger'><h5>This Receipt was Cancelled</h5></Message>
                                                </Col>
                                            </Row>

                                        </ListGroup.Item>
                                    )}

                                    {receipt.status === "Received" && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    <Message variant='success'><h5>This Receipt was Received</h5></Message>
                                                </Col>
                                            </Row>

                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
    )
}

export default ReceiptScreen
