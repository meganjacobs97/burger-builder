import React, { Component } from "react";
import { connect } from "react-redux"
import axios from "axios";

import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

import classes from "./Auth.module.css"

import * as actionCreators from "../../../store/actions/index";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "email",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                errorMessage: "",
                changed: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                errorMessage: "",
                changed: false
            }

        }
    }

    handleInputChange = (event, formElID) => {
        //copy form data
        const updatedform = { ...this.state.controls };
        //copy element value
        const updatedFormEl = { ...updatedform[formElID] };

        //set value to form's value 
        updatedFormEl.value = event.target.value;
        //check validity and set error message
        updatedFormEl.valid = this.validateInput(updatedFormEl.value, updatedFormEl.validation, updatedFormEl)
        //set changed to true 
        updatedFormEl.changed = true;
        //update form 
        updatedform[formElID] = updatedFormEl;



        //update state
        this.setState({ controls: updatedform });
    }


    validateInput = (value, rules, el) => {
        let isValid = true;

        if (rules && rules.required) {
            isValid = value.trim() !== "" && isValid;
            if (!isValid) {
                el.errorMessage = `You must enter a ${el.elementConfig.placeholder}.`
            }
            else {
                el.errorMessage = "";
            }
        }

        if (rules && rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
            if (!isValid) {
                if (el.errorMessage === "") {
                    el.errorMessage = `The ${el.elementConfig.placeholder} must have a minimum length of ${rules.minLength}.`
                }
                else {
                    el.errorMessage += ` The ${el.elementConfig.placeholder} must have a minimum length of ${rules.minLength}.`
                }
            }
            else {
                el.errorMessage = "";
            }
        }

        if (rules && rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
            if (!isValid) {
                if (el.errorMessage === "") {
                    el.errorMessage = `The ${el.elementConfig.placeholder} must have a maximum length of ${rules.minLength}.`
                }
                else {
                    el.errorMessage += ` The ${el.elementConfig.placeholder} must have a maximum length of ${rules.maxLength}.`
                }
            }
            else {
                el.errorMessage = "";
            }
        }

        if (isValid) {
            el.errorMessage = "";
        }

        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.authorize(this.state.controls.email.value, this.state.controls.password.value)
    }

    render() {
        //turn controls state into an array of elements 
        const formEls = [];
        for (let key in this.state.controls) {
            formEls.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formEls.map(el => {
            return <Input
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.changed}
                errorMessage={el.config.errorMessage}
                changed={(event) => this.handleInputChange(event, el.id)}
            />
        })

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button buttonType="Success">Submit</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    };
}
const mapDispatchToProps = dispatch => {
    return {
        authorize: (email, password) => dispatch(actionCreators.auth({ email: email, password: password }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth); 