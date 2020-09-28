import React, { Component } from "react";
import Wrapper from "../../../hoc/Wrapper"
import Burger from "../../Burger/Burger"
import BuildControls from "../../Burger/BuildControls/BuildControls"
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary"
import Spinner from "../../UI/Spinner/Spinner";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler"
import axios from "../../../axios-orders";
import { connect } from "react-redux"
import * as actionTypes from "../../../store/actions"

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        sendingPurchase: false,
        error: false
    }

    componentWillMount() {
        // axios.get("ingredients.json").then(res => {
        //     this.setState({ ingredients: res.data })
        // }).catch(err => {
        //     this.setState({ error: true })
        // })
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCanceledHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinuedHandler = () => {
        //push a new page onto the stack of pages 
        this.props.history.push("/checkout");
    }

    getPurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(key => {
            return ingredients[key];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)

        return sum > 0;
    }

    addIngredientHandler = (type) => {
        //add ingredient 
        // const oldCount = this.state.ingredients[type];
        // const newCount = oldCount + 1;

        // const newIngredients = { ...this.state.ingredients };
        // newIngredients[type] = newCount;

        // this.setState({ ingredients: newIngredients });

        // //add price
        // const priceAddition = ingredientPrices[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice + priceAddition;

        // this.setState({ totalPrice: newPrice });

        // this.updatePurchaseState(newIngredients);
    }

    removeIngredientHandler = (type) => {
        //remove ingredient 
        // const oldCount = this.state.ingredients[type];

        // if (oldCount <= 0) {
        //     return;
        // }

        // const newCount = oldCount - 1;

        // const newIngredients = { ...this.state.ingredients };
        // newIngredients[type] = newCount;

        // this.setState({ ingredients: newIngredients });

        // //remove price
        // const priceDeduction = ingredientPrices[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice - priceDeduction;

        // this.setState({ totalPrice: newPrice });

        // this.updatePurchaseState(newIngredients);
    }

    render() {
        const disabledInfo = { ...this.props.ings }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let modalContent = null;
        if (this.props.ings) {
            modalContent = <OrderSummary
                ingredients={this.props.ings}
                purchaseContinued={this.purchaseContinuedHandler}
                purchaseCanceled={this.purchaseCanceledHandler}
                price={this.props.price}
            />;
        }
        if (this.state.sendingPurchase) {
            modalContent = <Spinner />
        }

        let burger = <Spinner />
        if (this.state.error) {
            burger = <p>Ingredients can't be loaded.</p>
        }
        if (this.props.ings) {
            burger = <Wrapper>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    price={this.props.price}
                    ingredientAddedHandler={this.props.onAddIngredient}
                    ingredientRemovedHandler={this.props.onRemoveIngredient}
                    disabled={disabledInfo}
                    purchaseable={this.getPurchaseState(this.props.ings)}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ing) => dispatch({ type: actionTypes.ADD_INGREDIENT, payload: { ingredient: ing } }),
        onRemoveIngredient: (ing) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, payload: { ingredient: ing } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios)); 