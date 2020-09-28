import React, { Component } from "react";

import { Route } from "react-router-dom";
import { connect } from "react-redux"

import CheckoutSummary from "../../Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data")
    }
    render() {
        return <div>
            <CheckoutSummary
                ingredients={this.props.ings}
                onCheckoutCancel={this.checkoutCanceledHandler}
                onCheckoutContinue={this.checkoutContinuedHandler}
            />
            {/* using render instead of component means we can pass props, but we dont need to with redux*/}
            <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
        </div>
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    }
}
export default connect(mapStateToProps)(Checkout); 