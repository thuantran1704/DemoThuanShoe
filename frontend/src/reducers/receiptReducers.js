import { RECEIPT_CANCEL_FAIL, RECEIPT_CANCEL_REQUEST, RECEIPT_CANCEL_RESET, RECEIPT_CANCEL_SUCCESS, RECEIPT_CART_ADD_ITEM, RECEIPT_CART_CLEAR_ITEMS, RECEIPT_CART_REMOVE_ITEM, RECEIPT_CART_SAVE_SUPPLIER, RECEIPT_CREATE_FAIL, RECEIPT_CREATE_REQUEST, RECEIPT_CREATE_RESET, RECEIPT_CREATE_SUCCESS, RECEIPT_DETAILS_FAIL, RECEIPT_DETAILS_REQUEST, RECEIPT_DETAILS_RESET, RECEIPT_DETAILS_SUCCESS, RECEIPT_LIST_FAIL, RECEIPT_LIST_REQUEST, RECEIPT_LIST_SUCCESS, RECEIPT_RECEIVE_FAIL, RECEIPT_RECEIVE_REQUEST, RECEIPT_RECEIVE_RESET, RECEIPT_RECEIVE_SUCCESS } from '../constants/receiptConstants'

export const receiptCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIPT_CREATE_REQUEST:
            return { loading: true }
        case RECEIPT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                receipt: action.payload
            }
        case RECEIPT_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case RECEIPT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const receiptCancelReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIPT_CANCEL_REQUEST:
            return { loading: true }
        case RECEIPT_CANCEL_SUCCESS:
            return { loading: false, success: true }
        case RECEIPT_CANCEL_FAIL:
            return { loading: false, error: action.payload }
        case RECEIPT_CANCEL_RESET:
            return { receipt: {} }
        default:
            return state
    }
}

export const receiptReceiveReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIPT_RECEIVE_REQUEST:
            return { loading: true }
        case RECEIPT_RECEIVE_SUCCESS:
            return { loading: false, success: true }
        case RECEIPT_RECEIVE_FAIL:
            return { loading: false, error: action.payload }
        case RECEIPT_RECEIVE_RESET:
            return { receipt: {} }
        default:
            return state
    }
}

export const receiptDetailsReducer = (
    state = {
        loading: true,
        receiptItems: [],
        supplier: []
    }, action) => {
    switch (action.type) {
        case RECEIPT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case RECEIPT_DETAILS_SUCCESS:
            return {
                loading: false,
                receipt: action.payload
            }
        case RECEIPT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case RECEIPT_DETAILS_RESET:
            return {
                loading: true,
                receiptItems: [],
                supplier: [],
            }
        default:
            return state
    }
}

export const receiptListReducer = (state = { receipts: [] }, action) => {
    switch (action.type) {
        case RECEIPT_LIST_REQUEST:
            return { loading: true }
        case RECEIPT_LIST_SUCCESS:
            return {
                loading: false,
                receipts: action.payload.receipts,
                pages: action.payload.pages,
                page: action.payload.page,
                count: action.payload.count
            }
        case RECEIPT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const receiptCartReducer = (state = { receiptItems: [], supplier: {} }, action) => {
    switch (action.type) {
        case RECEIPT_CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.receiptItems.find(
                (x) => x.product === item.product)
            if (existItem) {
                return {
                    ...state,
                    receiptItems: state.receiptItems.map(x =>
                        x.product === existItem.product ? item : x),
                }
            }
            else {
                return {
                    ...state,
                    receiptItems: [...state.receiptItems, item]
                }
            }
        case RECEIPT_CART_REMOVE_ITEM:
            return {
                ...state,
                receiptItems: state.receiptItems.filter(x => x.product !== action.payload)
            }

        case RECEIPT_CART_SAVE_SUPPLIER:
            return {
                ...state,
                supplier: action.payload
            }
        case RECEIPT_CART_CLEAR_ITEMS:
            return {
                ...state,
                receiptItems: [],
            }
        default:
            return state
    }
}