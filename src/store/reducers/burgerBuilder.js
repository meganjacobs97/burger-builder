import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../utility"



const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const burgerBuilderReducer = (state = initialState, action) => {
    const ingredientPrices = {
        lettuce: .25,
        cheese: .25,
        bacon: .5,
        meat: 1
    }
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = { [action.payload.ingredient]: state.ingredients[action.payload.ingredient] + 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + ingredientPrices[action.payload.ingredient]
            }
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
        case actionTypes.ADD_INGREDIENT:
            const updatedIng = { [action.payload.ingredient]: state.ingredients[action.payload.ingredient] - 1 }
            const updatedIngs = updateObject(state.ingredients, updatedIng);

            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - ingredientPrices[action.payload.ingredient]
            }
            return updateObject(state, updatedSt);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state,
                {
                    ingredients: action.payload.ingredients,
                    error: false,
                    // initial value
                    totalPrice: 4
                })
        case actionTypes.INGREDIENTS_ERROR:
            return updateObject(state, { error: true })
        default:
            return state;
    }
}

export default burgerBuilderReducer; 