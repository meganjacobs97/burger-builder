import React from "react";

import classes from "./Order.module.css";

const Order = props => {
    //transform ingredients into array 
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] })
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return <span
            key={ingredient.name}
            style={{
                textTransform: "capitalize",
                display: "inline-block",
                margin: "0 8px",
                border: "1px solid #ccc",
                padding: "5px"
            }}
        >
            {ingredient.name} ({ingredient.amount})
            </span>
    })

    return <div className={classes.Order}>
        <p><strong>Ingredients: </strong>{ingredientOutput}</p>
        <p><strong>Price: </strong>{props.price.toFixed(2)}</p>
    </div>
}

export default Order; 