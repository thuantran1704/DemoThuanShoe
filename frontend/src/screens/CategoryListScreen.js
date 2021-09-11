import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap-v5'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteCategory, listCategories } from '../actions/categoryActions'
import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants'
import Meta from '../components/Meta'

const CategoryListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const { loading, error, categories } = categoryList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const categoryDelete = useSelector(state => state.categoryDelete)
    const {
        error: errorDelete,
        success: successDelete } = categoryDelete

    useEffect(() => {
        dispatch({ type: CATEGORY_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        dispatch(listCategories())

    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure ?')) {
            dispatch(deleteCategory(id))
        }
    }

    return (
        <>
            <Meta title={'Manager Categories'} />

            <Row className='align-items-center'>
                <Col md={4}>
                    <h1>Categories</h1>
                </Col>

                <Col className='btn btn-right'>
                    <LinkContainer to={`/admin/category/create`}>
                        <Button className='btn btn-primary'>
                            <i className='fas fa-plus'></i>
                            {' '} Create Category
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
                                        {categories && categories.map(category => (
                                            <tr key={category._id}>
                                                <td>{category.name}</td>
                                                <td>{category.description}</td>
                                               
                                                <td>
                                                    <LinkContainer to={`/admin/category/${category._id}/edit`}>
                                                        <Button variant='light' className='btn-sm'>
                                                            <i className='fas fa-edit'></i>
                                                            EDIT
                                                        </Button>
                                                    </LinkContainer>
                                                    <Button variant='danger' className='btn-sm'
                                                        onClick={() => deleteHandler(category._id)}>
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

export default CategoryListScreen
