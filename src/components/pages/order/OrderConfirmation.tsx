import {Order, OrderType} from "../../../models/order";
import User from "../../../models/user";
import React, {useState} from "react";
import classes from "../find-orders/FindOrders.module.css";
import {PATH_PROFILE} from "../../../config/routes-config";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button} from "../../styled/styled";
import {OrderUser} from "../../../models/order-user";
import {Deal} from "../../../models/deal";
import {dealsService, ordersService} from "../../../config/service-config";
import {useStore} from "@nanostores/react";
import {userData} from "../../../store/UserData";

type CheckoutProps = {
    order: Order,
    orderOwner: User
}

const OrderConfimation = ()=> {

    const location = useLocation();
    const deal : Deal = location.state.deal;
    const order : Order = location.state.order;
    const navigate = useNavigate()
    const user = useStore(userData)

    async function dealRequest(ownerId: string, deal: Deal) {
        // TODO
        // ordersService.addOrder()
        const res = await dealsService.offerDeal(ownerId, deal)
        console.log(res)
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
                    await dealRequest(user.id.toString(), deal)
                    showPopup()
                    navigate(PATH_PROFILE)
                }}>Confirm</Button>
            </div>
        </div>
    )

}

export default OrderConfimation