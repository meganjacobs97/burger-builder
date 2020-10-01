import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: []
}


const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default ordersReducer; 