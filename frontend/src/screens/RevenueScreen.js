import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form, Table } from 'react-bootstrap-v5'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listStatisticProductBetween } from '../actions/statisticActions'
import Meta from '../components/Meta'
import { Bar } from 'react-chartjs-2';
import Navigation from '../components/Navigation'

const RevenueScreen = ({ }) => {
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')

    const dispatch = useDispatch()

    const statisticProductBetween = useSelector(state => state.statisticProductBetween)
    const { loading, error, statisticProductBetweens, sum } = statisticProductBetween

    const names = statisticProductBetweens && statisticProductBetweens.map((item) => (item.name.slice(0, 22)));
    const solds = statisticProductBetweens && statisticProductBetweens.map((item) => (item.sold));

    useEffect(() => {
        if (dateFrom && dateTo) {
            dispatch(listStatisticProductBetween(dateFrom, dateTo))
        }
    }, [dispatch, dateTo, dateFrom])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(listStatisticProductBetween(dateFrom, dateTo))
    }

    return (
        <>
            <Row>
                <Meta title={`Revenue by Admin`} />
                <Col md={3}>
                    <h2>Input Date</h2>

                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='dateFrom'>
                            <Form.Label>From Date</Form.Label>
                            <Form.Control type='date'
                                min="2021-01-01" max="2021-09-11"

                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='dateTo'>
                            <Form.Label>To Date</Form.Label>
                            <Form.Control type='date'
                                min="2021-01-01" max="2021-12-31"

                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Submit
                        </Button>
                    </Form>
                </Col>
                {dateFrom && dateTo ? (
                    <Col md={9}>
                        <h2>Statistic Revenue</h2>
                        {loading ? <Loader />
                            : error ? <Message variant='danger'>{error}</Message>
                                : (
                                    <Table striped bordered hover responsive className='table-secondary'>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <h2>
                                                        Total revenue : $ {sum} between {dateFrom} & {dateTo}
                                                    </h2>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <td>
                                                <Bar
                                                    data={
                                                        {
                                                        labels: names,
                                                        datasets: [
                                                            {
                                                                label: "Sold",
                                                                backgroundColor: [
                                                                    'rgba(255, 99, 132, 0.2)',
                                                                    'rgba(54, 162, 235, 0.2)',
                                                                    'rgba(255, 206, 86, 0.2)',
                                                                    'rgba(75, 192, 192, 0.2)',
                                                                    'rgba(153, 102, 255, 0.2)',
                                                                    'rgba(255, 159, 64, 0.2)'
                                                                ],
                                                                borderColor: [
                                                                    'rgba(255, 99, 132, 1)',
                                                                    'rgba(54, 162, 235, 1)',
                                                                    'rgba(255, 206, 86, 1)',
                                                                    'rgba(75, 192, 192, 1)',
                                                                    'rgba(153, 102, 255, 1)',
                                                                    'rgba(255, 159, 64, 1)'
                                                                ],
                                                                borderWidth: 1,
                                                                data: solds
                                                            }
                                                        ]
                                                    }
                                                    
                                                }
                                                    options={{
                                                        legend: { display: false },
                                                        title: {
                                                            display: true,
                                                            text: "Alooo aloooo"
                                                        }
                                                    }}
                                                />

                                            </td>
                                        </tbody>
                                    </Table>
                                )}
                    </Col>
                )
                    : (
                        <Col md={8}>
                            <Message variant='warning'>Please entered From Date and To Date to Statistic</Message>
                        </Col>
                    )
                }

            </Row>
        </>
    )
}

export default RevenueScreen