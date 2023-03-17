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

const DealCurrentOwner = () => {
    const [avatarUrl, setAvatarUrl] = useState("")
    const [person, setPerson] = useState<User>(getEmptyUser())
    const [deal, setDeal] = useState<Deal>()
    const { id } = useParams()
    const [amountPay, setAmountPay] = useState("")
    const [amountReceive, setAmountReceive] = useState("")
    const [order, setOrder] = useState<Order>()

    async function getData() {
        // @ts-ignore
        const data = await dealsService.getDealUser(id)
        const { person, deal } = data
        const orderUser = await ordersUserService.getOrderUser(deal.orderId)
        const { order } = orderUser

        getAvatar(Number(person.chatId)).then(res => setAvatarUrl(res))
        setDeal(deal)
        setPerson(person)

        setOrder(order)
        if (String(order.orderType) === OrderType[OrderType.SELL]) {
            setAmountReceive(`${order.amount * order.price} ${order.currency}`)
            setAmountPay(`${order.amount} TON`)
        }

        if (String(order.orderType) === OrderType[OrderType.BUY]) {
            setAmountReceive(`${order.amount} TON`)
            setAmountPay(`${order.amount * order.price} ${order.currency}`)
        }
    }

    useEffect(() => {
        getData()
    }, [])

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
    <p className={classes.userName}>@{person.username}</p>
    {/* <p className={classes.statusComleted}>{order?.status}</p> */}
    </div>
    </div>
    <Link className={classes.chatLink} to={`https://t.me/${person.username}`}>
    See Chat
    </Link>
    </div>

    <div className={classes.infoContainer}>
    <div className={classes.infoItem}>
    <p className={classes.infoItemTitle}>Price:</p>
    <p className={classes.infoItemValue}>{deal?.amount}</p>
    </div>

    <div className={classes.infoItem}>
    <p className={classes.infoItemTitle}>I want to pay:</p>
    <p className={classes.infoItemValue}>{amountPay}</p>
        </div>

        <div className={classes.infoItem}>
    <p className={classes.infoItemTitle}>I will receive:</p>
    <p className={classes.infoItemValue}>{amountReceive}</p>
        </div>

        </div>
        <MapView x={order?.location.x} y={order?.location.y} />
    <div className={classes.buttonContainer}>
    <button
        className={classes.buttonValueCancel}
    onClick={() => (!!deal?.id ? dealsService.denyDeal(deal.id) : "")}
>
    Deny
    </button>
    <button className={classes.buttonValueCame}>Accept</button>
        </div>
        </section>
)
}

export default DealCurrentOwner
