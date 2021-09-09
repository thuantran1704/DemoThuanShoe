import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav, NavDropdown, Dropdown } from 'react-bootstrap-v5'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { listBrands } from '../actions/brandActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listCategories } from '../actions/categoryActions'

const Navigation = () => {
    const dispatch = useDispatch()

    const brandList = useSelector(state => state.brandList)
    const { loading, error, brands } = brandList

    const categoryList = useSelector(state => state.categoryList)
    const { loading: loadingCate, error: errorCate, categories } = categoryList

    useEffect(() => {
        dispatch(listBrands())
        dispatch(listCategories())
    }, [dispatch])

    return (
        <>
            <div class="nav justify-content-center">

                <Nav class="nav-item">
                    <Link class="nav-link active" to="/">Home</Link>
                </Nav>
                <Nav className="ml-auto">

                    <NavDropdown title='Brands'>
                        {
                            loading ? <Loader />
                                : error ? <Message variant='danger'> {error}</Message>
                                    : (
                                        <>
                                            {brands.map(brand => (
                                                <>
                                                    <LinkContainer to={`/brand/${brand.name}`}>
                                                        <NavDropdown.Item><strong>{brand.name}</strong></NavDropdown.Item>
                                                    </LinkContainer>
                                                    <div class="dropdown-divider" />

                                                </>
                                            ))}

                                        </>
                                    )
                        }

                    </NavDropdown>
                </Nav>

                <Nav className="ml-auto">

                    <NavDropdown title='Categories'>
                        {
                            loadingCate ? <Loader />
                                : errorCate ? <Message variant='danger'> {errorCate}</Message>
                                    : (
                                        categories && (
                                            <>
                                                {categories.map(category => (
                                                    <>
                                                        <LinkContainer to={`/category/${category.name}`}>
                                                            <NavDropdown.Item><strong>{category.name}</strong></NavDropdown.Item>
                                                        </LinkContainer>
                                                        <div class="dropdown-divider" />
                                                    </>
                                                ))}
                                            </>
                                        )
                                    )
                        }
                    </NavDropdown>
                </Nav>
                <Nav class="nav-item">
                    <Link class="nav-link" to="/about" tabindex="-1" aria-disabled="true">About</Link>
                </Nav>

            </div>
            <hr />
        </>
    )
}

export default Navigation