import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap-v5'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listReceipts } from '../actions/receiptActions'
import { RECEIPT_DETAILS_RESET } from '../constants/receiptConstants'
import Meta from '../components/Meta'

const ReceiptListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const receiptList = useSelector(state => state.receiptList)
    const { loading, error, receipts, pages, page, count } = receiptList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listReceipts(pageNumber))
            dispatch({ type: RECEIPT_DETAILS_RESET })
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo, pageNumber])

    return (
        <>
            <Meta title={'Manager Orders'} />

            <h1>Receipts {count && `(${count})`}</h1>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'> {error}</Message>
                        : (
                            <>
                                <Table striped bordered hover responsive className='table-sm'>
                                    <thead>
                                        <tr>
                                            <th>CREATOR ID</th>
                                            <th>CREATE AT</th>
                                            <th>RECEIVE AT</th>
                                            <th>TOTAL</th>
                                            <th>STATUS</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {receipts.map(receipt => (
                                            <tr key={receipt._id}>
                                                <td>{receipt.user }</td>
                                                <td>{receipt.orderAt.substring(0, 10)}</td>
                                                {receipt.receiveAt && receipt.status === "Received"
                                                    ? <td>{receipt.receiveAt.substring(0, 10)}</td>
                                                    : <td>---</td>
                                                }
                                                <td>{receipt.totalPrice.toFixed(1)}</td>
                                                <td>
                                                    {receipt.status === "Ordered" ? (<i className='fas fa-truck' style={{ color: 'primary' }}> Ordered</i>) :
                                                        receipt.status === "Cancelled" ? (<i className='fas fa-times' style={{ color: 'red' }}> Cancelled</i>) :
                                                            (<i className='fas fa-check' style={{ color: 'green' }}> Received </i>)
                                                    }
                                                </td>

                                               
                                                <td>
                                                    <LinkContainer to={`/admin/receipt/${receipt._id}`}>
                                                        <Button variant='light' className='btn-sm'>
                                                            Details
                                                        </Button>
                                                    </LinkContainer>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Paginate
                                    pages={pages}
                                    page={page}
                                    isAdmin={true}
                                    details='orderlist' />
                            </>
                        )
            }
        </>
    )
}

export default ReceiptListScreen
