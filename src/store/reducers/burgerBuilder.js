import * as actionTypes from "../actions/actionTypes"
import {updateObject} from "../utility"

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

const addIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: updateObject(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}),
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    });
};

const removeIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: updateObject(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}),
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    });
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4, // This resets the price, when a burger is purchased, but ingredients and price is not saved when a user goes back - this will not be addressed right now.
        error: false,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):
           return addIngredient(state, action);
    
        case (actionTypes.REMOVE_INGREDIENT):
            return removeIngredient(state, action);

        case (actionTypes.SET_INGREDIENTS):
            return setIngredients(state, action);          

        case (actionTypes.FETCH_INGREDIENTS_FAILED):
            return updateObject(state, {error: true});

        default:
            return state;
    }
};

export default reducer;