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