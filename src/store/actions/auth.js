import * as actionTypes from "./actionTypes";

import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = payload => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            authData: payload.authData
        }
    }
}

export const authError = err => {
    return {
        type: actionTypes.AUTH_ERROR,
        error: err
    }
}

export const auth = (payload) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        }
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsrTCfMI-spPGyphhn0NAx_8rDHLIp9BY",
            authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res));
            })
            .catch(err => {
                console.log(err);
                dispatch(authError(err));
            })

        console.log(payload)

    }
}