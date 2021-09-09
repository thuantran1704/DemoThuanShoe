import axios from 'axios'
import { CATEGORY_CREATE_FAIL, CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_DETAILS_FAIL, CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_UPDATE_FAIL, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_RESET, CATEGORY_UPDATE_SUCCESS } from '../constants/categoryConstants'

export const listCategories = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST })
        const { data } = await axios.get(`/api/categories`)
        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listCategoryDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_DETAILS_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const { data } = await axios.get(`/api/categories/${id}`, config)
        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteCategory = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.delete(`/api/categories/${id}`, config)

        dispatch({
            type: CATEGORY_DELETE_SUCCESS,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
       
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload: message,
        })
    }
}

export const createCategory = (name, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`/api/categories`, { name, description }, config)

        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
       
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload: message,
        })
    }
}

export const updateCategory = (categoryId, name, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_UPDATE_REQUEST
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
        const { data } = await axios.put(`/api/categories/${categoryId}`, { categoryId, name, description }, config)

        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
        })
        
        dispatch({ type: CATEGORY_UPDATE_RESET })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: CATEGORY_UPDATE_FAIL,
            payload: message,
        })
    }
}