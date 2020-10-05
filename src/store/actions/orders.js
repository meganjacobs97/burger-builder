import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload: {
            id: id,
            orderData: orderData
        }
    }
}

export const purchaseBurgerFailed = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_ERROR,
        payload: {
            error: error
        }
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = payload => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        //add .json because we're using firebase 
        axios.post("/orders.json", payload.orderData).then(res => {
            dispatch(purchaseBurgerSuccess(res.data.name, payload.orderData))

        }).catch(err => {
            dispatch(purchaseBurgerFailed(err));
        })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}



export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get("orders.json").then(res => {
            //we get back a js object 
            //we want to turn it into an array but also keep the key 
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        }).catch(err => {
            dispatch(fetchOrdersFailed(err));
        })
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: {
            orders: orders
        }
    }
}

export const fetchOrdersFailed = error => {
    return {
        type: actionTypes.FETCH_ORDERS_ERROR,
        payload: {
            error: error
        }
    }
}