import classes from "./Deal.module.css"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ReactNode, useEffect, useState } from "react"
import { ImageAvatar } from "@twa-dev/mark42"
import ButtonBack from "../../buttonBack/ButtonBack"
import { MapView } from "../../map/MapView"
import { dealsService, ordersUserService } from "../../../config/service-config"
import getAvatar from "../../../utils/getAvatar"
import User, { getEmptyUser } from "../../../models/user"
import { getEmptyDeal, Deal, DealStatus } from "../../../models/deal"
import Order, { getEmptyOrder, OrderType } from "../../../models/order"
import DealCurrent from "./DealCurrent"
import DealPending from "./DealPending"
import DealDenied from "./DealDenied"
import DealCancel from "./DealCancel"
import DealFinish from "./DealFinish"

const DealPage = () => {
  const [dealOwner, setDealOwner] = useState<User>(getEmptyUser())
  const [deal, setDeal] = useState<Deal>(getEmptyDeal(""))
  const { id } = useParams()
  const [order, setOrder] = useState<Order>(getEmptyOrder({ x: 0, y: 0 }))
  const [orderOwner, setOrderOwner] = useState<User>(getEmptyUser())

  async function getData() {
    // @ts-ignore
    const data = await dealsService.getDealUser(id)
    const { person, deal } = data
    setDeal(deal)
    setDealOwner(person)
    const orderUser = await ordersUserService.getOrderUser(deal.orderId)

    setOrder(orderUser.order)
    setOrderOwner(orderUser.person)
  }

  useEffect(() => {
    getData()
  }, [])

  if (String(deal.dealStatus) === "CURRENT") {
    return <DealCurrent deal={deal} order={order} id={id} dealOwner={dealOwner} orderOwner={orderOwner} />
  }

  if (String(deal.dealStatus) === "PENDING") {
    return <DealPending deal={deal} order={order} id={id} dealOwner={dealOwner} orderOwner={orderOwner} />
  }

  if (String(deal.dealStatus) === "DENIED") {
    return <DealDenied deal={deal} order={order} id={id} dealOwner={dealOwner} orderOwner={orderOwner} />
  }

  if (String(deal.dealStatus) === "CANCEL") {
    return <DealCancel deal={deal} order={order} id={id} dealOwner={dealOwner} orderOwner={orderOwner} />
  }

  if (String(deal.dealStatus) === "FINISH") {
    return <DealFinish deal={deal} order={order} id={id} dealOwner={dealOwner} orderOwner={orderOwner} />
  }

  return <div></div>
}

export default DealPage
