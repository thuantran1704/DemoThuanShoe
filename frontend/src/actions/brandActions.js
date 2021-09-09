import axios from 'axios'
import { BRAND_DETAILS_REQUEST, BRAND_DETAILS_SUCCESS, BRAND_DETAILS_FAIL, BRAND_DETAILS_RESET, BRAND_CREATE_FAIL, BRAND_CREATE_REQUEST, BRAND_CREATE_SUCCESS, BRAND_DELETE_FAIL, BRAND_DELETE_REQUEST, BRAND_DELETE_SUCCESS, BRAND_LIST_FAIL, BRAND_LIST_REQUEST, BRAND_LIST_SUCCESS, BRAND_UPDATE_FAIL, BRAND_UPDATE_REQUEST, BRAND_UPDATE_RESET, BRAND_UPDATE_SUCCESS } from '../constants/brandConstants'

export const listBrands = () => async (dispatch) => {
    try {
        dispatch({ type: BRAND_LIST_REQUEST })
        const { data } = await axios.get(`/api/brands`)
        dispatch({
            type: BRAND_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BRAND_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listBrandDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BRAND_DETAILS_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const { data } = await axios.get(`/api/brands/${id}`, config)
        dispatch({
            type: BRAND_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BRAND_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteBrand = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BRAND_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.delete(`/api/brands/${id}`, config)

        dispatch({
            type: BRAND_DELETE_SUCCESS,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: BRAND_DELETE_FAIL,
            payload: message,
        })
    }
}

export const createBrand = (name, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BRAND_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`/api/brands`, { name, description }, config)

        dispatch({
            type: BRAND_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: BRAND_CREATE_FAIL,
            payload: message,
        })
    }
}

export const updateBrand = (brandId, name, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BRAND_UPDATE_REQUEST
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
        const { data } = await axios.put(`/api/brands/${brandId}`, { brandId, name, description }, config)

        dispatch({
            type: BRAND_UPDATE_SUCCESS,

        })
     
        dispatch({ type: BRAND_UPDATE_RESET })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: BRAND_UPDATE_FAIL,
            payload: message,
        })
    }
}