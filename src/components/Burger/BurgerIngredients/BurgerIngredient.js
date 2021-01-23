import React from "react";
import PropTypes from "prop-types";

import classes from "./BurgerIngredient.css"

const burgerIngredient = props => {
    // This would be much easier if the naming conventions aligned
    // If that was the case it would be possible to simply use props.type without all the absurd string formatting
    const type = props.type.search("-") > 0 
        ? 
            (
                props.type.charAt(0).toUpperCase() 
                + props.type.slice(1, props.type.search("-"))
                + (props.type.slice(props.type.search("-")+1)).charAt(0).toUpperCase() 
                + (props.type.slice(props.type.search("-")+1)).slice(1)
            )
        : 
            ( 
                props.type.charAt(0).toUpperCase() 
                + props.type.slice(1)
            );

    if (type === "BreadTop") {
        return  (
            <div className={classes.BreadTop}>
                <div className={classes.Seeds1}></div>
                <div className={classes.Seeds2}></div>
            </div>
        )
    }

    return <div className={classes[type]}></div>
};

burgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default burgerIngredient;