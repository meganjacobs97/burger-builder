import React from "react";

import Wrapper from "../../../hoc/Wrapper"
import Button from "../../UI/Button/Button"

const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}>
                    {igKey}
                </span>: {props.ingredients[igKey]}
            </li>
        })
    return <Wrapper>
        <h3>Your order</h3>
        <p>Ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total price: ${props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button clicked={props.purchaseCanceled} buttonType="Danger">Cancel</Button>
        <Button clicked={props.purchaseContinued} buttonType="Success">Continue</Button>
    </Wrapper>
}

export default OrderSummary; 