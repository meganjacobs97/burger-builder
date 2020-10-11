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
            token: payload.idToken,
            userId: payload.localId
        }
    }
}

export const authError = err => {
    return {
        type: actionTypes.AUTH_ERROR,
        payload: {
            error: err
        }
    }
}

export const auth = (payload, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsrTCfMI-spPGyphhn0NAx_8rDHLIp9BY";
        if (!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsrTCfMI-spPGyphhn0NAx_8rDHLIp9BY"
        }
        axios.post(url, authData)
            .then(res => {
                dispatch(authSuccess(res.data));
            })
            .catch(err => {
                dispatch(authError(err.response.data.error));
            })
    }
}