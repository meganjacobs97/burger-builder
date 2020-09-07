import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button"

import classes from "./CheckoutSummary.module.css";



const CheckoutSummary = props => {
    return <div className={classes.CheckoutSummary}>
        <div style={{ width: "100%", margin: "auto" }}>
            <Burger ingredients={props.ingredients} />
        </div>
        <Button buttonType="Danger" clicked={props.onCheckoutCancel}>Cancel</Button>
        <Button buttonType="Success" clicked={props.onCheckoutContinue}>Continue</Button>
    </div>
}

export default CheckoutSummary; 