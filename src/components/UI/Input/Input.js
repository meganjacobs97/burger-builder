import React from "react";

import classes from "./Input.module.css";

const Input = props => {
    let inputEl = null;

    switch (props.inputType) {
        case ("input"):
            inputEl = <input className={classes.InputEl} {...props} />
            break;
        case ("textarea"):
            inputEl = <textarea {...props} />
            break;
        default:
            inputEl = <input className={classes.InputEl} {...props} />
    }

    return <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputEl}
    </div>
}

export default Input; 