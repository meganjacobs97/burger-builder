import React from "react";
import classes from "./BuildControl.module.css"

const BuildControl = props => {
    return <div className={classes.BuildControl}>
        <div className={classes.Label}><p>{props.label}</p></div>
        <button className={classes.More} onClick={props.added}>Add</button>
        <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>Remove</button>
    </div >
}

export default BuildControl; 