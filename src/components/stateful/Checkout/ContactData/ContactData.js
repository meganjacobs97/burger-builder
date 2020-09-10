import React, { Component } from "react";

import Button from "../../../UI/Button/Button"
import Spinner from "../../../UI/Spinner/Spinner"
import Input from "../../../UI/Input/Input";

import classes from "./ContactData.module.css";

import axios from "../../../../axios-orders";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            zipcode: null,
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
    render() {
        let form = <div className={classes.ContactData}>
            <h4>Enter your contact info:</h4>
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="name" />
                <Input inputtype="input" type="email" name="email" placeholder="email" />
                <Input inputtype="input" type="text" name="street" placeholder="street address" />
                <Input inputtype="input" type="text" name="zipcode" placeholder="zipcode" />
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