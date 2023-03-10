import {Order, OrderType} from "../../../models/order";
import User from "../../../models/user";
import React, {useState} from "react";
import classes from "../find-orders/FindOrders.module.css";
import {PATH_PROFILE} from "../../../config/routes-config";
import {Link, useLocation} from "react-router-dom";
import {Button} from "../../styled/styled";
import {OrderUser} from "../../../models/order-user";
import {Deal} from "../../../models/deal";

type CheckoutProps = {
    order: Order,
    orderOwner: User
}

const OrderConfimation = ()=> {

    const location = useLocation();
    const deal : Deal = location.state;


    return (
        <div>
            <Link className={classes.backButton} to={PATH_PROFILE}>
                go back
            </Link>
            <div>
                <h1 className={classes.ordersTitle}>Order confirmation</h1>
            </div>

            <div>
                <div>
                    <div>Amount {deal.amount} TON</div>
                    <div>Amount {deal.amount*deal.price} {deal.currency}</div>
                </div>
            </div>
            <div>
                <Button>Cancel</Button>
                <Button>Confirm</Button>
            </div>
        </div>
    )

}

export default OrderConfimation