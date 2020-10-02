import React, { Component } from "react";

import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux"

import CheckoutSummary from "../../Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

import * as actions from "../../../store/actions/index"

class Checkout extends Component {
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data")
    }
    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            // redirect only if we're finished purchasing 
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={this.props.ings}
                    onCheckoutCancel={this.checkoutCanceledHandler}
                    onCheckoutContinue={this.checkoutContinuedHandler}
                />
                {/* using render instead of component means we can pass props, but we dont need to with redux*/}
                <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
            </div>
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased
    }
}

export default connect(mapStateToProps)(Checkout); 