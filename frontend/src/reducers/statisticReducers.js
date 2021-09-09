import { GET_STATISTIC_PRODUCT_BETWEEN_DATE_FAIL, GET_STATISTIC_PRODUCT_BETWEEN_DATE_REQUEST, GET_STATISTIC_PRODUCT_BETWEEN_DATE_SUCCESS, GET_STATISTIC_PRODUCT_SOLD_FAIL, GET_STATISTIC_PRODUCT_SOLD_REQUEST, GET_STATISTIC_PRODUCT_SOLD_SUCCESS } from '../constants/statisticConstants'

export const statisticProductSoldListReducer = (state = { statisticProductSolds: [] }, action) => {
    switch (action.type) {
        case GET_STATISTIC_PRODUCT_SOLD_REQUEST:
            return { loading: true, statisticProductSolds: [] }
        case GET_STATISTIC_PRODUCT_SOLD_SUCCESS:
            return {
                loading: false,
                statisticProductSolds: action.payload,
                
            }
        case GET_STATISTIC_PRODUCT_SOLD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const statisticProductBetweenReducer = (state = { statisticProductBetweens: [] }, action) => {
    switch (action.type) {
        case GET_STATISTIC_PRODUCT_BETWEEN_DATE_REQUEST:
            return { loading: true, statisticProductBetweens: [] }
        case GET_STATISTIC_PRODUCT_BETWEEN_DATE_SUCCESS:
            return {
                loading: false,
                statisticProductBetweens: action.payload,
                
            }
        case GET_STATISTIC_PRODUCT_BETWEEN_DATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}