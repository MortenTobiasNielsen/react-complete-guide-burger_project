import React, {useState, useEffect} from "react";
import {connect} from "react-redux";

import Burger from "./../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index"

export const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const {onInitIngredients} = props;

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0
    }

    const purchaseHandler = () => {
        if (props.isAuth) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath("/checkout");
            props.history.push("/auth");
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push("/checkout");
    }

    const disableInfo = {
        ...props.ings
    };

    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary = null; 
    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>

    if (props.ings) {
        burger = (
            <React.Fragment>
                <Burger ingredients={props.ings} />
                <BuildControls 
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disableInfo}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                    price={props.totalPrice}
                    isAuth={props.isAuth}
                />
            </React.Fragment>
        );

        orderSummary = 
            <OrderSummary 
                ingredients={props.ings}
                price={props.totalPrice}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
            />
    }

    return (
        <React.Fragment>
            <Modal 
            show={purchasing}
            modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onFetchIngredientsFailed: () => dispatch(actions.fetchIngredientsFailed()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));