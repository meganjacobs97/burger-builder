import React, { Component } from "react";

import CheckoutSummary from "../../Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
    state = {
        ingredients: {
            meat: 1,
            cheese: 1,
            bacon: 1,
            lettuce: 1
        }
    }
    render() {
        return <div>
            <CheckoutSummary ingredients={this.state.ingredients} />
        </div>
    }
}

export default Checkout; 