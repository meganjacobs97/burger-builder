import React from "react";

import Wrapper from "../../hoc/Wrapper";
import classes from "./Layout.module.css";

const Layout = (props) => {
    return (
        <Wrapper >
            <div>Toolbar, Sidedrawer, Backdrop</div>
            <main className={classes.content}>{props.children}</main>
        </Wrapper>
    )
}
export default Layout; 