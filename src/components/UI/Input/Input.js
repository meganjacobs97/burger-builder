import React from "react";

import classes from "./Input.module.css";

const Input = props => {
    let inputEl = null;

    const inputClasses = [classes.InputEl];
    if (props.invalid && props.shouldValidate) {
        inputClasses.push(classes.Invalid)
    }

    let errorMessage = props.errorMessage;
    if (props.errorMessage === "") {
        errorMessage = null;
    }

    switch (props.elementType) {
        case ("input"):
            inputEl = <input className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case ("textarea"):
            inputEl = <textarea className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case ("select"):
            inputEl = (
                <select className={inputClasses.join(" ")} value={props.value} onChange={props.changed}>
                    {
                        props.elementConfig.options.map(option => {
                            return <option key={option.value} value={option.value}>{option.displayValue}</option>
                        })
                    }
                </select >
            )
            break;
        default:
            inputEl = <input className={classes.InputEl} {...props.elementConfig} value={props.value} onChange={props.changed} />
    }

    return <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputEl}
        {errorMessage}
    </div>
}

export default Input; 