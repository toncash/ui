import {Order, OrderType} from "../../../models/order";
import User from "../../../models/user";
import React, {useEffect, useState} from "react";
import classes from "../find-orders/FindOrders.module.css";
import {PATH_FINDORDERS, PATH_ORDER_CONFIRMATION, PATH_PROFILE} from "../../../config/routes-config";
import {Link, useLocation} from "react-router-dom";
import UserInfoShort from "../../user-info/UserInfoShort";
import {TextField} from "@mui/material";
import {useStore} from "@nanostores/react";
import {userData} from "../../../store/UserData";
import {Deal, DealStatus, getEmptyDeal} from "../../../models/deal";
import {useTonConnect} from "../../../hooks/useTonConnect";
import {useTonClient} from "../../../hooks/useTonClient";

type CheckoutProps = {
    order: Order,
    person: User
}

const CheckoutDeal = ()=> {

    const [amountToPay, setAmountToPay] = useState<number>()
    const [amountToReceive, setAmountToReceive] = useState<number>()
    const [errorAmount, setErrorAmount] = useState("")
    const location = useLocation();
    const user = useStore(userData)
    const { connected, wallet } = useTonConnect()
    const client = useTonClient()
    const orderUser = location.state;

    const order: Order = orderUser?.order
    const [deal, setDeal] = useState<Deal>(getEmptyDeal(order.id as string))

    useEffect(()=>{
        deal.addressBuyer = wallet as string
    }, [wallet])

    useEffect(()=>{
        deal.dealStatus = DealStatus.CURRENT
        deal.sellerId = order.orderType===OrderType.SELL ? order.ownerId : user.id
        deal.buyerId = order.orderType===OrderType.BUY ? order.ownerId : user.id
        setDeal({...deal})
    }, [])

    function validateFn(amount: number){
        console.log('amount>order.amount')
        console.log(`${amount}>${order.amount}`)
        if(amount>order.amount){
            return "Amount too big"
        }

        return ""

    }

    function handleChangeAmountToPay(event: any){
        const value = Number(event.target.value)
        setAmountToPay(value)
        if(String(order.orderType) === OrderType[OrderType.SELL]){
            deal.amount = Number((value/order.price).toFixed(2))
            setAmountToReceive(deal.amount)

        } else if(String(order.orderType) === OrderType[OrderType.BUY]){
            deal.amount = Number(value)
            setAmountToReceive(Number((value*order.price).toFixed(2)))
        }
        const message = validateFn(deal.amount)
        setDeal({...deal})
        setErrorAmount(message)
    }

    function handleChangeAmountToReceive(event: any){
        const value = Number(event.target.value)
        setAmountToReceive(value)
        if(String(order.orderType) === OrderType[OrderType.SELL]){
            deal.amount = Number(value)
            setAmountToPay(Number((value*order.price).toFixed(2)))


        } else if(String(order.orderType) === OrderType[OrderType.BUY]){
            deal.amount = Number((value/order.price).toFixed(2))
            setAmountToPay(deal.amount)
        }
        const message = validateFn(deal.amount)
        setDeal({...deal})
        setErrorAmount(message)
    }

    return (
        <div>
            <Link className={classes.backButton} to={PATH_PROFILE}>
                go back
            </Link>
            <div>
                <h1 className={classes.ordersTitle}>Checkout</h1>
            </div>

            <div>
                <UserInfoShort user={orderUser.person} order={orderUser.order}/>
            </div>
            <div>
                <div>
                    <div>Amount</div>
                    <div>{orderUser.order.amount}</div>
                </div>
                <div>
                    <TextField
                        id="pay"
                        label={"I want to pay " +
                            (String(order.orderType) === OrderType[OrderType.SELL] ? order.currency : "TON" )
                        }
                        variant="outlined"
                        type="number"
                        value={amountToPay}
                        error={!!errorAmount}
                        helperText={errorAmount}
                        onChange={handleChangeAmountToPay} />
                    <TextField
                        id="receive"
                        label={"I want to receive " +
                            (String(order.orderType) === OrderType[OrderType.SELL] ? "TON" : order.currency)
                        }
                        variant="outlined"
                        type="number"
                        value={amountToReceive}
                        error={!!errorAmount}
                        helperText={errorAmount}
                        onChange={handleChangeAmountToReceive} />
                </div>
            </div>
            <div>
                <Link to={PATH_FINDORDERS}>Cancel</Link>
                <Link to={PATH_ORDER_CONFIRMATION} state={{deal, order}}>Buy TON</Link>
            </div>
        </div>
    )

}

export default CheckoutDeal