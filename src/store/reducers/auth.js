import { act } from "react-dom/test-utils";
import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, { loading: true, error: null });
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, { loading: false, error: null, token: action.payload.token, userId: action.payload.userId })
        case actionTypes.AUTH_ERROR:
            return updateObject(state, { loading: false, error: action.payload.error })
        default:
            return state;
    }
}

export default authReducer; 