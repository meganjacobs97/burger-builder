import React, { Component } from "react";

import Button from "../../../UI/Button/Button"
import Spinner from "../../../UI/Spinner/Spinner"
import Input from "../../../UI/Input/Input";

import classes from "./ContactData.module.css";

import axios from "../../../../axios-orders";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "name",
                },
                value: ""
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "email",
                },
                value: ""
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "street address"
                },
                value: ""
            },
            zipcode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "zipcode",
                },
                value: ""
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "country"
                },
                value: ""
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }]
                },
                value: "fastest"
            }
        },
        sendingPurchase: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ sendingPurchase: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            // dummy data to be overwritten when form is added
            customer: {
                name: "Rory Kees",
                email: "test@test.com",
                address: "1234 Test Drive",
                country: "USA",
                zipcode: 98503
            },
            deliveryMethod: "fastest"
        }
        //add .json because we're using firebase 
        axios.post("/orders.json", order).then(res => {
            this.setState({ sendingPurchase: false });
            this.props.history.push("/");

        }).catch(err => {
            this.setState({ sendingPurchase: false });
        })
    }

    handleInputChange = (event, formElID) => {
        //copy form data
        const updatedOrderForm = { ...this.state.orderForm };
        //copy element value
        const updatedFormEl = { ...updatedOrderForm[formElID] };

        //set value to form's value 
        updatedFormEl.value = event.target.value;
        //update form 
        updatedOrderForm[formElID] = updatedFormEl;

        //update state
        this.setState({ orderForm: updatedOrderForm });
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
            <form>
                {formEls.map(formEl => {
                    return <Input
                        key={formEl.id}
                        elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}
                        changed={(event) => this.handleInputChange(event, formEl.id)}
                    />;
                })}
                <Button buttonType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        </div>;
        if (this.state.sendingPurchase) {
            form = <Spinner />
        }
        return form;
    }
}

export default ContactData; 