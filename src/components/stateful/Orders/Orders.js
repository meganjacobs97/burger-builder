import React, { Component } from "react";
import Order from "../../Order/Order";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler"

import axios from "../../../axios-orders";

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
        error: false
    }
    componentDidMount() {
        axios.get("orders.json").then(res => {
            //we get back a js object 
            //we want to turn it into an array but also keep the key 
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({ loading: false, orders: fetchedOrders })
        }).catch(err => {
            this.setState({ error: true, loading: false })
        })
    }
    render() {
        return <div>
            {this.state.orders.map(order => {
                return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            })}
        </div>

    }
}
export default WithErrorHandler(Orders, axios); 