import React, { Component } from "react";
import Wrapper from "../../../hoc/Wrapper"
import Burger from "../../Burger/Burger"
import BuildControls from "../../Burger/BuildControls/BuildControls"
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary"
import Spinner from "../../UI/Spinner/Spinner";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler"
import axios from "../../../axios-orders";

const ingredientPrices = {
    lettuce: .25,
    cheese: .25,
    bacon: .5,
    meat: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 5,
        purchaseable: false,
        purchasing: false,
        sendingPurchase: false,
        error: false
    }

    componentWillMount() {
        axios.get("ingredients.json").then(res => {
            this.setState({ ingredients: res.data })
        }).catch(err => {
            this.setState({ error: true })
        })
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCanceledHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinuedHandler = () => {
        //build query string 
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))

        }
        queryParams.push(`price=${this.state.totalPrice}`)
        const queryString = queryParams.join("&");
        //push a new page onto the stack of pages 
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString
        });
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

        let modalContent = null;
        if (this.state.ingredients) {
            modalContent = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseContinued={this.purchaseContinuedHandler}
                purchaseCanceled={this.purchaseCanceledHandler}
                price={this.state.totalPrice}
            />;
        }
        if (this.state.sendingPurchase) {
            modalContent = <Spinner />
        }

        let burger = <Spinner />
        if (this.state.error) {
            burger = <p>Ingredients can't be loaded.</p>
        }
        if (this.state.ingredients) {
            burger = <Wrapper>
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

        return <Wrapper>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
                {modalContent}
            </Modal>
            {burger}

        </Wrapper>
    }
}
export default WithErrorHandler(BurgerBuilder, axios); 