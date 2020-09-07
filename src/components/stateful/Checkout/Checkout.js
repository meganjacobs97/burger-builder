import React, { Component } from "react";

import CheckoutSummary from "../../Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            bacon: 0,
            lettuce: 0
        }
    }
    componentDidMount() {
        //extract url params 
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            //['meat','1']
            ingredients[param[0]] = parseInt(param[1])
        }

        this.setState({ ingredients: ingredients });
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
        </div>
    }
}

export default Checkout; 