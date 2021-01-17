import React, {Component} from "react";

import Order from "../../components/Order/Order"
import axios from "../../axios-orders"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        console.log("Orders did mount")
        axios.get("/orders.json")
            .then(res => {
                console.log("Orders fetched")
                const fetchedOrders = [];
                console.log(res.data)
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key,
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            })

            console.log(this.state)
    }
    
    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}/>
                ))}
            </div>
        );
    };
};

export default withErrorHandler(Orders, axios);