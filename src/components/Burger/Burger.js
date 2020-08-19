import React from "react";
import classes from "./Burger.module.css"

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"

const Burger = (props) => {
    //transofrm object of key value pairs into an array of burger ingredients 
    //array of keys from object
    let ingredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            //return new array of length that corresponds to ingredient key
            return [...Array(props.ingredients[ingredientKey])]
                //map over that new array to get an ingredient for every one we need 
                .map((_, i) => {
                    return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
                })
        })
        //to check if we actually have ingredients to render - use reduce to pull out values of inner arrays 
        //this "flattens" the array 
        .reduce((arr, el) => {
            //take given element and add to array 
            return arr.concat(el);
        }, [])

    //we now have an array that is either empty or has our ingredients 
    if (ingredients.length === 0) {
        ingredients = <p>Start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bun-top" />
            {ingredients}
            <BurgerIngredient type="bun-bottom" />
        </div>
    );
}

export default Burger; 