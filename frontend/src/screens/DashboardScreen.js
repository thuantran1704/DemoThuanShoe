import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap-v5'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Bar } from 'react-chartjs-2';
import { listStatisticProductSold } from '../actions/statisticActions'

const DashboardScreen = ({ }) => {
    const dispatch = useDispatch()

    const { loading, error, statisticProductSolds } = useSelector(state => state.statisticProductSoldList)

    useEffect(() => {
        dispatch(listStatisticProductSold())
    }, [dispatch])

    const names = statisticProductSolds && statisticProductSolds.map((item) => (item.name.slice(0, 20)));
    const solds = statisticProductSolds && statisticProductSolds.map((item) => (item.sold));
    return (
        <>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'> {error} </Message>
                        : (
                            <>
                                <Table striped bordered hover responsive className='table-secondary'>
                                    <thead>
                                        <tr>
                                            <th>
                                                <h2>
                                                    Statistical table of the most sold products ever
                                                </h2>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <td>
                                            <Bar
                                                data={{
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
                                                }}
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
                            </>
                        )

            }
        </>
    )
}
export default DashboardScreen;
