import classes from "./Deal.module.css"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ImageAvatar } from "@twa-dev/mark42"
import ButtonBack from "../../buttonBack/ButtonBack"
import { MapView } from "../../map/MapView"
import { dealsService, ordersUserService } from "../../../config/service-config"
import getAvatar from "../../../utils/getAvatar"
import User, { getEmptyUser } from "../../../models/user"
import { getEmptyDeal, Deal } from "../../../models/deal"
import Order, { OrderType } from "../../../models/order"
import {DealProps} from "./deal-props";

const DealCurrent = (props: DealProps) => {
    const {deal, id, order, dealOwner, orderOwner} = props
    const [isDealOwner, setIsDealOwner] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState("")
    console.log(id)
    const [amountPay, setAmountPay] = useState("")
    const [amountReceive, setAmountReceive] = useState("")

    async function getData() {

        if(orderOwner.chatId == dealOwner.chatId){
            setIsDealOwner(true)
            setAvatarUrl(await getAvatar(orderOwner.chatId))
        } else{
            setIsDealOwner(false)
            setAvatarUrl(await getAvatar(dealOwner.chatId))
        }

        if (String(order.orderType) === OrderType[OrderType.SELL]) {
            setAmountReceive(`${deal.amount * order.price} ${order.currency}`)
            setAmountPay(`${deal.amount} TON`)
        }

        if (String(order.orderType) === OrderType[OrderType.BUY]) {
            setAmountReceive(`${deal.amount} TON`)
            setAmountPay(`${deal.amount * order.price} ${order.currency}`)
        }


    }

    useEffect(() => {
        getData()
        console.log(props)
    }, [deal, order])

    return (
        <section className={classes.orderPage}>
        <div className={classes.orderHeaders}>
        <ButtonBack />
        <h1 className={classes.orderTitle}>Deal</h1>
            </div>
            <div className={classes.orderItem}>
    <div className={classes.userContainer}>
    <ImageAvatar src={avatarUrl} size={57} />
    <div>
    <p className={classes.userName}>@{!isDealOwner?dealOwner.username:orderOwner.username}</p>
    {/* <p className={classes.statusComleted}>{order?.status}</p> */}
    </div>
    </div>
                {isDealOwner?<Link className={classes.chatLink} to={`https://t.me/${dealOwner.username}`}>See Chat
                </Link>:''}
    </div>

    <div className={classes.infoContainer}>
    <div className={classes.infoItem}>
    <p className={classes.infoItemTitle}>Price:</p>
    <p className={classes.infoItemValue}>{order.price} {order.currency}</p>
    </div>

    <div className={classes.infoItem}>
    <p className={classes.infoItemTitle}>I will to pay:</p>
    <p className={classes.infoItemValue}>{isDealOwner?amountPay:amountReceive}</p>
        </div>

        <div className={classes.infoItem}>
    <p className={classes.infoItemTitle}>I will receive:</p>
    <p className={classes.infoItemValue}>{isDealOwner?amountReceive:amountPay}</p>
        </div>

        </div>
        <MapView x={order?.location.x} y={order?.location.y} />
            {!isDealOwner ?<div className={classes.buttonContainer}>
         <button
                className={classes.buttonValueCancel}
                onClick={() => (!!deal?.id ? dealsService.denyDeal(deal.id) : "")}
            >
                Deny
            </button>
            <button className={classes.buttonValueCame}>Accept</button>

            </div> :
                <div className={classes.buttonContainer}>
                    <button className={classes.buttonValueCancel} onClick={()=>dealsService.cancelDeal(deal.id as string)}>Cancel</button>
                </div>}
        </section>
)
}

export default DealCurrent
