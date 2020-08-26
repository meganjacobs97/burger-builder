import React from "react";

//have to import image because we're using webpack
import burgerlogo from "../../assets/images/burger-logo.png"

import classes from "./Logo.module.css"

const Logo = props => {
    return <div className={classes.Logo}>
        <img src={burgerlogo} alt="Burger"></img>
    </div>
}

export default Logo; 