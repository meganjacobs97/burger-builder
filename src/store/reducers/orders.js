import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../utility"

const initialState = {
    orders: [],
    sendingPurchase: false,
    purchased: false,
    loading: false
}



const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return updateObject(state,
                {
                    sendingPurchase: false,
                    purchased: true
                })
        case actionTypes.PURCHASE_BURGER_ERROR:
            return updateObject(state, { sendingPurchase: false })
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { sendingPurchase: true })
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false })
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, { loading: true })
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state,
                {
                    orders: action.payload.orders,
                    loading: false
                })
        case actionTypes.FETCH_ORDERS_ERROR:
            return updateObject(state, { loading: false })
        default:
            return state;
    }
}

export default ordersReducer; 