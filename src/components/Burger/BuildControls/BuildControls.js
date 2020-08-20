import React from "react";
import classes from "./BuildControls.module.css"
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: "Lettuce", type: "lettuce" },
    { label: "Cheese", type: "cheese" },
    { label: "Bacon", type: "bacon" },
    { label: "Meat", type: "meat" }
];

const BuildControls = props => (
    <div className={classes.BuildControls}>
        <p>Current price: <string>{props.price.toFixed(2)}</string></p>
        {controls.map(control => {
            return <BuildControl
                key={control.label}
                label={control.label}
                added={() => props.ingredientAddedHandler(control.type)}
                removed={() => { props.ingredientRemovedHandler(control.type) }}
                disabled={props.disabled[control.type]}
            />
        })}
    </div>
)

export default BuildControls; 