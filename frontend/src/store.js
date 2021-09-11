import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    producListReducer,
    producDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
    productBrandReducer,
    productTopRatedByBrandReducer,
    productSameReducer,
    productTopRatedByCategoryReducer,
    productCategoryReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    userDisableReducer
} from './reducers/userReducers'
import {
    orderCreateReducer,
    orderCancelReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
} from './reducers/orderReducers'

import {
    brandListReducer,
    brandDeleteReducer,
    brandCreateReducer,
    brandUpdateReducer,
    brandDetailsReducer
} from './reducers/brandReducers'

import {
    categoryListReducer,
    categoryDeleteReducer,
    categoryCreateReducer,
    categoryUpdateReducer,
    categoryDetailsReducer
} from './reducers/categoryReducers'

import {
    receiptCreateReducer,
    receiptCancelReducer,
    receiptReceiveReducer,
    receiptListReducer,
    receiptDetailsReducer,
    receiptCartReducer
} from './reducers/receiptReducers'

import {
    statisticProductSoldListReducer,
    statisticProductBetweenReducer
} from './reducers/statisticReducers'

const reducer = combineReducers({

    statisticProductSoldList: statisticProductSoldListReducer,
    statisticProductBetween: statisticProductBetweenReducer,

    receiptCart: receiptCartReducer,
    receiptCreate: receiptCreateReducer,
    receiptCancel: receiptCancelReducer,
    receiptReceive: receiptReceiveReducer,
    receiptList: receiptListReducer,
    receiptDetails: receiptDetailsReducer,

    brandList: brandListReducer,
    brandDetails: brandDetailsReducer,
    brandDelete: brandDeleteReducer,
    brandCreate: brandCreateReducer,
    brandUpdate: brandUpdateReducer,

    categoryList: categoryListReducer,
    categoryDetails: categoryDetailsReducer,
    categoryDelete: categoryDeleteReducer,
    categoryCreate: categoryCreateReducer,
    categoryUpdate: categoryUpdateReducer,

    productList: producListReducer,
    productDetails: producDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    productBrand: productBrandReducer,
    productTopRatedByBrand: productTopRatedByBrandReducer,
    productSame: productSameReducer,
    productCategory: productCategoryReducer,
    productTopRatedByCategory: productTopRatedByCategoryReducer,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userDisable:userDisableReducer,

    orderCreate: orderCreateReducer,
    orderCancel: orderCancelReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
})

const userInfoFromStorage =
    localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null

const cartItemsFromStorage =
    localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems'))
        : []

const shippingAddressFromStorage =
    localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {}

const receiptItemsFromStorage =
    localStorage.getItem('receiptItems') ?
        JSON.parse(localStorage.getItem('receiptItems'))
        : []

const supplierFromStorage =
    localStorage.getItem('supplier')
        ? JSON.parse(localStorage.getItem('supplier'))
        : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    receiptCart: {
        receiptItems: receiptItemsFromStorage,
        supplier: supplierFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store