import React, { Component } from "react";
import classes from "./Modal.module.css"
import Wrapper from "../../../hoc/Wrapper"
import Backdrop from "../Backdrop/Backdrop"

class Modal extends Component {
    //only rerender when the modal is shown 
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }
    render() {
        return <Wrapper>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={
                    // vh = viewport height
                    {
                        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                        opacity: props.show ? "1" : "0"
                    }
                }
            >
                {props.children}
            </div>
        </Wrapper>
    }
}

export default Modal; 