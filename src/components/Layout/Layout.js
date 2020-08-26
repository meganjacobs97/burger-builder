import React, { Component } from "react";

import Wrapper from "../../hoc/Wrapper";
import Toolbar from "../Navigation/Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"

import classes from "./Layout.module.css";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }
    drawerToggleClickedHandler = () => {
        const currentShowState = this.state.showSideDrawer;
        this.setState({ showSideDrawer: !currentShowState })
    }
    render() {
        return (
            < Wrapper >
                <Toolbar drawerToggleClicked={this.drawerToggleClickedHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.content}>{this.props.children}</main>
            </Wrapper >
        )
    }
}
export default Layout; 