import axios from 'axios'
import { GET_STATISTIC_PRODUCT_BETWEEN_DATE_FAIL, GET_STATISTIC_PRODUCT_BETWEEN_DATE_REQUEST, GET_STATISTIC_PRODUCT_BETWEEN_DATE_SUCCESS, GET_STATISTIC_PRODUCT_SOLD_FAIL, GET_STATISTIC_PRODUCT_SOLD_REQUEST, GET_STATISTIC_PRODUCT_SOLD_SUCCESS } from '../constants/statisticConstants'

export const listStatisticProductSold = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_STATISTIC_PRODUCT_SOLD_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(`/api/statistic`, config)
        dispatch({
            type: GET_STATISTIC_PRODUCT_SOLD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_STATISTIC_PRODUCT_SOLD_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listStatisticProductBetween = (dateFrom, dateTo) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_STATISTIC_PRODUCT_BETWEEN_DATE_REQUEST })

        const { data } = await axios.post(`/api/statistic/productbetween`, { dateFrom, dateTo })
        
        dispatch({
            type: GET_STATISTIC_PRODUCT_BETWEEN_DATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_STATISTIC_PRODUCT_BETWEEN_DATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
//sao m toàn bị cái l gì v ;v
//thua =)))))
// xóa project đi // hoiiiii =)))))