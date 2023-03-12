import {Order, OrderType} from "../../../models/order";
import User from "../../../models/user";
import React, {useState} from "react";
import classes from "../find-orders/FindOrders.module.css";
import {PATH_PROFILE} from "../../../config/routes-config";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button} from "../../styled/styled";
import {OrderUser} from "../../../models/order-user";
import {Deal} from "../../../models/deal";
import {ordersService} from "../../../config/service-config";

type CheckoutProps = {
    order: Order,
    orderOwner: User
}

const OrderConfimation = ()=> {

    const location = useLocation();
    const deal : Deal = location.state.deal;
    const order : Order = location.state.order;
    const navigate = useNavigate()

    function addDealToOrder(order: Order, deal: Deal) {
        // TODO
        // ordersService.addOrder()
    }

    function showPopup(){
        // TODO
    }


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
                    <div>Amount {deal.amount*order.price} {order.currency}</div>
                </div>
            </div>
            <div>
                <Button>Cancel</Button>
                <Button onClick={async ()=>{
                    await addDealToOrder(order, deal)
                    showPopup()
                    navigate(PATH_PROFILE)
                }}>Confirm</Button>
            </div>
        </div>
    )

}

export default OrderConfimation