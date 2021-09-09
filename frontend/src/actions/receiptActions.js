import axios from 'axios'
import { RECEIPT_CANCEL_FAIL, RECEIPT_CANCEL_REQUEST, RECEIPT_CANCEL_SUCCESS, RECEIPT_CART_ADD_ITEM, RECEIPT_CART_REMOVE_ITEM, RECEIPT_CART_SAVE_SUPPLIER, RECEIPT_CREATE_FAIL, RECEIPT_CREATE_REQUEST, RECEIPT_CREATE_RESET, RECEIPT_CREATE_SUCCESS, RECEIPT_DETAILS_FAIL, RECEIPT_DETAILS_REQUEST, RECEIPT_DETAILS_RESET, RECEIPT_DETAILS_SUCCESS, RECEIPT_LIST_FAIL, RECEIPT_LIST_REQUEST, RECEIPT_LIST_SUCCESS, RECEIPT_RECEIVE_FAIL, RECEIPT_RECEIVE_REQUEST, RECEIPT_RECEIVE_SUCCESS } from '../constants/receiptConstants'
import { USER_DETAIL_RESET, USER_LIST_RESET, USER_LOGOUT } from '../constants/userConstants'

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('receiptItems')
    localStorage.removeItem('supplier')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAIL_RESET })
    dispatch({ type: USER_LIST_RESET })
    document.location.href = '/login'
}

export const createReceipt = (receipt) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RECEIPT_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(
            `/api/receipts`, receipt, config)

        dispatch({
            type: RECEIPT_CREATE_SUCCESS,
            payload: data

        })
        dispatch({
            type: RECEIPT_CREATE_RESET,
            payload: data

        })
        localStorage.removeItem('receiptItems')
    } catch (error) {
        dispatch({
            type: RECEIPT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const cancelReceipt = (receipt) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RECEIPT_CANCEL_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const { data } = await axios.put(`/api/receipts/${receipt._id}/cancel`, receipt, config)

        dispatch({
            type: RECEIPT_CANCEL_SUCCESS,
        })
        dispatch({
            type: RECEIPT_DETAILS_SUCCESS, payload: data
        })
        dispatch({ type: RECEIPT_DETAILS_RESET })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: RECEIPT_CANCEL_FAIL,
            payload: message,
        })
    }
}

export const receiveReceipt = (receipt) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RECEIPT_RECEIVE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const { data } = await axios.put(`/api/receipts/${receipt._id}/receive`, receipt, config)

        dispatch({
            type: RECEIPT_RECEIVE_SUCCESS,
        })
        dispatch({
            type: RECEIPT_DETAILS_SUCCESS, payload: data
        })
        dispatch({ type: RECEIPT_DETAILS_RESET })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: RECEIPT_RECEIVE_FAIL,
            payload: message,
        })
    }
}

export const getReceiptDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RECEIPT_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(
            `/api/receipts/${id}`, config)

        dispatch({
            type: RECEIPT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RECEIPT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const addToReceiptCart = (id, importPrice, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: RECEIPT_CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            price: data.price,
            qty,
            importPrice
        }
    })

    localStorage.setItem('receiptItems', JSON.stringify(getState().receiptCart.receiptItems))
}

export const removeFromReceiptCart = (id) => (dispatch, getState) => {
    dispatch({
        type: RECEIPT_CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('receiptItems', JSON.stringify(getState().receiptCart.receiptItems))
}

export const saveSupplier = (data) => (dispatch) => {
    dispatch({
        type: RECEIPT_CART_SAVE_SUPPLIER,
        payload: data
    })

    localStorage.setItem('supplier', JSON.stringify(data))
}

export const listReceipts = (pageNumber = '') => async (dispatch, getState) => {
    try {
        dispatch({
            type: RECEIPT_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(
            `/api/receipts?pageNumber=${pageNumber}`, config)

        dispatch({
            type: RECEIPT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: RECEIPT_LIST_FAIL,
            payload: message,
        })
    }
}