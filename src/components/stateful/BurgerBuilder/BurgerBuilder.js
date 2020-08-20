import React, { Component } from "react";
import Wrapper from "../../../hoc/Wrapper"
import Burger from "../../Burger/Burger"
import BuildControls from "../../Burger/BuildControls/BuildControls"

const ingredientPrices = {
    lettuce: .25,
    cheese: .25,
    bacon: .5,
    meat: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            lettuce: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 5
    }

    addIngredientHandler = (type) => {
        //add ingredient 
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;

        const newIngredients = { ...this.state.ingredients };
        newIngredients[type] = newCount;

        this.setState({ ingredients: newIngredients });

        //add price
        const priceAddition = ingredientPrices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice });
    }

    removeIngredientHandler = (type) => {
        //remove ingredient 
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const newCount = oldCount - 1;

        const newIngredients = { ...this.state.ingredients };
        newIngredients[type] = newCount;

        this.setState({ ingredients: newIngredients });

        //remove price
        const priceDeduction = ingredientPrices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({ totalPrice: newPrice });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return <Wrapper>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
                price={this.state.totalPrice}
                ingredientAddedHandler={this.addIngredientHandler}
                ingredientRemovedHandler={this.removeIngredientHandler}
                disabled={disabledInfo} />
        </Wrapper>
    }
}
export default BurgerBuilder; 