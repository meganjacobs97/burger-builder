import React, { Component } from "react";

import { connect } from "react-redux";

import Button from "../../../UI/Button/Button"
import Spinner from "../../../UI/Spinner/Spinner"
import Input from "../../../UI/Input/Input";

import classes from "./ContactData.module.css";

import axios from "../../../../axios-orders";
import withErrorHandler from "../../../../hoc/WithErrorHandler/WithErrorHandler"

import * as actions from "../../../../store/actions/index";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "name",
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                errorMessage: "",
                changed: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "email",
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                errorMessage: "",
                changed: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "street address"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                errorMessage: "",
                changed: false
            },
            zipcode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "zipcode",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                errorMessage: "",
                changed: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "country"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                errorMessage: "",
                changed: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }]
                },
                value: "fastest",
                valid: true,
                changed: false
            }
        },
        formIsValid: false
    }

    handleInputChange = (event, formElID) => {
        //copy form data
        const updatedOrderForm = { ...this.state.orderForm };
        //copy element value
        const updatedFormEl = { ...updatedOrderForm[formElID] };

        //set value to form's value 
        updatedFormEl.value = event.target.value;
        //check validity and set error message
        updatedFormEl.valid = this.validateInput(updatedFormEl.value, updatedFormEl.validation, updatedFormEl)
        //set changed to true 
        updatedFormEl.changed = true;
        //update form 
        updatedOrderForm[formElID] = updatedFormEl;

        //check if form is valid 
        let formIsValid = true;
        for (let input in updatedOrderForm) {
            formIsValid = updatedOrderForm[input].valid && formIsValid;
        }

        //update state
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
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

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formEl in this.state.orderForm) {
            formData[formEl] = this.state.orderForm[formEl].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        this.props.onOrderBurger(order);

    }

    render() {
        //turn orderform state into an array of elements 
        const formEls = [];
        for (let key in this.state.orderForm) {
            formEls.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        //create form by looping through array
        let form = <div className={classes.ContactData}>
            <h4>Enter your contact info:</h4>
            <form onSubmit={this.orderHandler}>
                {formEls.map(formEl => {
                    return <Input
                        key={formEl.id}
                        elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}
                        invalid={!formEl.config.valid}
                        shouldValidate={formEl.config.changed}
                        errorMessage={formEl.config.errorMessage}
                        changed={(event) => this.handleInputChange(event, formEl.id)}
                    />;
                })}
                <Button buttonType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        </div>;
        if (this.props.sendingPurchase) {
            form = <Spinner />
        }
        return form;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        sendingPurchase: state.orders.sendingPurchase
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger({ orderData: orderData }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios)); 