import React from "react";

import Wrapper from "../../../hoc/Wrapper"

const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}>
                    {igKey}
                </span>:
                    {props.ingredients[igKey]}
            </li>
        })
    return <Wrapper>
        <h3>Your order</h3>
        <p>Ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p>Continue to checkout?</p>
    </Wrapper>
}

export default OrderSummary; 