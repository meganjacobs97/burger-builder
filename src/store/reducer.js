import * as actionTypes from "./actions";

const initialState = {
    ingredients: {
        lettuce: 0,
        meat: 0,
        bacon: 0,
        cheese: 0
    },
    totalPrice: 4
}


const reducer = (state = initialState, action) => {
    const ingredientPrices = {
        lettuce: .25,
        cheese: .25,
        bacon: .5,
        meat: 1
    }
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return ({
                ...state,
                ingredients:
                {
                    ...state.ingredients,
                    [action.payload.ingredient]: state.ingredients[action.payload.ingredient] + 1
                },
                totalPrice: state.totalPrice + ingredientPrices[action.payload.ingredient]
            })
        case actionTypes.REMOVE_INGREDIENT:
            return ({
                ...state,
                ingredients:
                {
                    ...state.ingredients,
                    [action.payload.ingredient]: state.ingredients[action.payload.ingredient] - 1
                },
                totalPrice: state.totalPrice - ingredientPrices[action.payload.ingredient]
            })
        default:
            return state;
    }
}

export default reducer; 