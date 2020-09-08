import React, { Component } from "react";

import { Route } from "react-router-dom";

import CheckoutSummary from "../../Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            bacon: 0,
            lettuce: 0
        },
        totalPrice: 0
    }
    componentDidMount() {
        //extract url params 
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = null;
        for (let param of query.entries()) {
            //['meat','1']
            if (param[0] === "price") {
                price = parseFloat(param[1])
            }
            else {
                ingredients[param[0]] = parseInt(param[1])
            }
        }

        this.setState({ ingredients: ingredients, totalPrice: price });
    }
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data")
    }
    render() {
        return <div>
            <CheckoutSummary
                ingredients={this.state.ingredients}
                onCheckoutCancel={this.checkoutCanceledHandler}
                onCheckoutContinue={this.checkoutContinuedHandler}
            />
            {/* using render instead of component means we can pass props*/}
            <Route path={this.props.match.path + "/contact-data"} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
        </div>
    }
}

export default Checkout; 