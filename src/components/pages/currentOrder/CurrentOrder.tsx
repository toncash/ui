import classes from "./CurrentOrder.module.css"
import {default as classesMap} from "../find-orders/FindOrders.module.css"
import {Link, useParams} from "react-router-dom"
import {FC, useEffect, useState} from "react"
import {ImageAvatar} from "@twa-dev/mark42"
import ButtonBack from "../../buttonBack/ButtonBack"
import {ordersService, ordersUserService} from "../../../config/service-config";
import Order, {OrderStatus, OrderType} from "../../../models/order";
import User, {getEmptyUser} from "../../../models/user";
import getAvatar from "../../../utils/getAvatar";
import {MapComponent} from "../../map/MapComponent";
import {useStore} from "@nanostores/react";
import {locationData} from "../../../store/Location";
import {userData} from "../../../store/UserData";

const CurrentOrder: FC = () => {
  const [order, setOrder] = useState<Order>({
    amount: 0,
    currency: "",
    deals: [],
    id: "",
    limit: {min: 0, max: 0},
    localDateTime: "",
    location: {x: 0, y: 0},
    orderStatus: OrderStatus.CURRENT,
    orderType: OrderType.SELL,
    ownerId: "1234",
    price: 0

  })
  const [person, setPerson] = useState<User>(getEmptyUser())
  const [avatarUrl, setAvatarUrl] = useState("")
  const {id} = useParams()
  const user = useStore(userData)

  async function getData() {
    console.log("start")
    console.log(id)
      const {order, person} = await ordersUserService.getOrderUser(id as string)
      setOrder(order)
      setPerson(person)
      if(user.id===person.id){
        setAvatarUrl("/my_order.png")
      } else {
        getAvatar(Number(person.id))
            .then(res=>setAvatarUrl(res))
      }

    }

    useEffect(() => {
      getData()
    }, [])

  return (
      <div>

    <section className={classes.orderPage}>
      <div className={classes.orderHeaders}>
        <ButtonBack />
        <h1 className={classes.orderTitle}>Order</h1>
      </div>
      <div className={classes.orderItem}>
        <div className={classes.userContainer}>
          <ImageAvatar src={avatarUrl} size={57} />
          <div>
            <p className={classes.userName}>{ user.id != person.id ? `@${person.username}` : "My order"}</p>
            <p className={classes.statusComleted}>{order?.orderStatus}</p>
          </div>
        </div>
        {user.id!==person.id?<Link className={classes.chatLink} to={`https://t.me/${person.username}`}>
          See Chat
        </Link> : <div></div>}
      </div>

      <div className={classes.infoContainer}>
        <div className={classes.infoItem}>
          <p className={classes.infoItemTitle}>Date:</p>
          <p className={classes.infoItemValue}>{order?.localDateTime?.substring(0, 10)}</p>
        </div>

        <div className={classes.infoItem}>
          <p className={classes.infoItemTitle}>Amount:</p>
          <p className={classes.infoItemValue}>{order?.amount} TON</p>
        </div>

        <div className={classes.infoItem}>
          <p className={classes.infoItemTitle}>I want to pay:</p>
          <p className={classes.infoItemValue}>{order?.amount}</p>
        </div>

        <div className={classes.infoItem}>
          <p className={classes.infoItemTitle}>I will receive:</p>
          <p className={classes.infoItemValue}>{order?.amount}</p>
        </div>


      </div>

    </section>
        <div className={classesMap.orders} style={{height: '300px'}}>
          <div className={classesMap.viewListOrdersContainer}>
            <MapComponent ordersUsers={[{order, person}]}/>
          </div>
        </div>
        <button>Cancel</button>
      </div>

  )
}

export default CurrentOrder
