import React, { Component } from "react";
import Order from "../../Order/Order";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler"
import Spinner from "../../UI/Spinner/Spinner"

import axios from "../../../axios-orders";

import { connect } from "react-redux"
import * as actionCreators from "../../../store/actions/index"


class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }
    render() {
        let orders = null;
        if (this.props.loading) {
            orders = <Spinner />
        }
        if (this.props.orders) {
            orders = <div>
                {this.props.orders.map(order => {
                    return <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                })}
            </div>
        }
        return orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        error: state.orders.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actionCreators.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios)); 