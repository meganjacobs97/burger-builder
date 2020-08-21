import React, { Component } from "react";
import Wrapper from "../../../hoc/Wrapper"
import Burger from "../../Burger/Burger"
import BuildControls from "../../Burger/BuildControls/BuildControls"
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary"

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
        totalPrice: 5,
        purchaseable: false,
        purchasing: false
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(key => {
            return ingredients[key];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)

        this.setState({ purchaseable: sum > 0 })
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

        this.updatePurchaseState(newIngredients);
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

        this.updatePurchaseState(newIngredients);
    }

    render() {
        const disabledInfo = { ...this.state.ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return <Wrapper>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                <OrderSummary ingredients={this.state.ingredients} />
            </Modal>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
                price={this.state.totalPrice}
                ingredientAddedHandler={this.addIngredientHandler}
                ingredientRemovedHandler={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchaseable={this.state.purchaseable}
                ordered={this.purchasingHandler} />
        </Wrapper>
    }
}
export default BurgerBuilder; 