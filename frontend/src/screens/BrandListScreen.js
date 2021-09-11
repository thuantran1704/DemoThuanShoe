import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap-v5'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteBrand, listBrands } from '../actions/brandActions'
import { BRAND_CREATE_RESET } from '../constants/brandConstants'
import Meta from '../components/Meta'

const BrandListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const brandList = useSelector(state => state.brandList)
    const { loading, error, brands } = brandList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const brandDelete = useSelector(state => state.brandDelete)
    const {
        error: errorDelete,
        success: successDelete } = brandDelete

    useEffect(() => {
        dispatch({ type: BRAND_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        dispatch(listBrands())

    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure ?')) {
            dispatch(deleteBrand(id))
        }
    }

    return (
        <>
            <Meta title={'Manager Brands'} />

            <Row className='align-items-center'>
                <Col md={4}>
                    <h1>Brands</h1>
                </Col>

                <Col className='btn btn-right'>
                    <LinkContainer to={`/admin/brand/create`}>
                        <Button className='btn btn-primary'>
                            <i className='fas fa-plus'></i>
                            {' '} Create Brand
                        </Button>
                    </LinkContainer>

                </Col>

            </Row>
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'> {error}</Message>
                        : (
                            <>
                                <Table striped bordered hover responsive className='table-secondary'>
                                    <thead>
                                        <tr>
                                            <th>NAME</th>
                                            <th>DESCRIPTION</th>
                                
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {brands.map(brand => (
                                            <tr key={brand._id}>
                                                <td>{brand.name}</td>
                                                <td>{brand.description}</td>
                                               
                                                <td>
                                                    <LinkContainer to={`/admin/brand/${brand._id}/edit`}>
                                                        <Button variant='light' className='btn-sm'>
                                                            <i className='fas fa-edit'></i>
                                                            EDIT
                                                        </Button>
                                                    </LinkContainer>
                                                    <Button variant='danger' className='btn-sm'
                                                        onClick={() => deleteHandler(brand._id)}>
                                                        <i className='fas fa-trash'></i>
                                                        {' '}DELETE
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                            </>
                        )
            }
        </>
    )
}

export default BrandListScreen
