import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    sendingPurchase: false,
    purchased: false
}


const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id,

            }
            return {
                ...state,
                sendingPurchase: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            }
        case actionTypes.PURCHASE_BURGER_ERROR:
            return {
                ...state,
                sendingPurchase: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                sendingPurchase: true
            }
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        default:
            return state;
    }
}

export default ordersReducer; 