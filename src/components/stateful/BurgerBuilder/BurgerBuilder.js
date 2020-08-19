import React, { Component } from "react";
import Wrapper from "../../../hoc/Wrapper"
import Burger from "../../Burger/Burger"
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            lettuce: 0,
            cheese: 0,
            bacon: 0
        }
    }
    render() {
        return <Wrapper>
            <Burger ingredients={this.state.ingredients} />
            <p>Build Controls</p>
        </Wrapper>
    }
}
export default BurgerBuilder; 