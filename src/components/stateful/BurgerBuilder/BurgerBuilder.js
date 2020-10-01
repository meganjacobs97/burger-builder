import React, { Component } from "react";
import Wrapper from "../../../hoc/Wrapper"
import Burger from "../../Burger/Burger"
import BuildControls from "../../Burger/BuildControls/BuildControls"
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary"
import Spinner from "../../UI/Spinner/Spinner";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler"
import { connect } from "react-redux"
import axios from "../../../axios-orders";

import * as actionCreators from "../../../store/actions/index"

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.initializeIngredients();
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

        let burger = <Spinner />
        if (this.props.error) {
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ing) => dispatch(actionCreators.addIngredient({ ingredient: ing })),
        onRemoveIngredient: (ing) => dispatch(actionCreators.removeIngredient({ ingredient: ing })),
        initializeIngredients: () => dispatch(actionCreators.initializeIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios)); 