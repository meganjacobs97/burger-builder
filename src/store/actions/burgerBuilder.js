import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

//action creator 
export const addIngredient = (payload) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: {
            ingredient: payload.ingredient
        }
    }
}

export const removeIngredient = (payload) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: {
            payload: payload.ingredient
        }
    }
}

//sync function 
const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: {
            ingredients: ingredients
        }
    }
}

const ingredientsError = () => {
    return {
        type: actionTypes.INGREDIENTS_ERROR
    }
}

//asyc function 
export const initializeIngredients = () => {
    return dispatch => {
        axios.get("ingredients.json").then(res => {
            dispatch(setIngredients(res.data))
        }).catch(err => {
            dispatch(ingredientsError());
        })

    }
}