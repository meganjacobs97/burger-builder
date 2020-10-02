import * as actionTypes from "../actions/actionTypes";

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
        case actionTypes.SET_INGREDIENTS:
            return ({
                ...state,
                ingredients: action.payload.ingredients,
                error: false,
                // initial value
                totalPrice: 4
            });
        case actionTypes.INGREDIENTS_ERROR:
            return ({
                ...state,
                error: true
            })
        default:
            return state;
    }
}

export default burgerBuilderReducer; 