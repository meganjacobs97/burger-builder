import React, { Component } from "react";
import classes from "./Modal.module.css"
import Wrapper from "../../../hoc/Wrapper"
import Backdrop from "../Backdrop/Backdrop"

class Modal extends Component {
    //only rerender when the modal is shown 
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || this.props.children !== nextProps.children;
    }
    render() {
        return <Wrapper>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
            <div
                className={classes.Modal}
                style={
                    // vh = viewport height
                    {
                        transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                        opacity: this.props.show ? "1" : "0"
                    }
                }
            >
                {this.props.children}
            </div>
        </Wrapper>
    }
}

export default Modal; 