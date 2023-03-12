import { ImageAvatar } from "@twa-dev/mark42"
import { Link } from "react-router-dom"
import { BASE_PATH_CURRENTORDER } from "../../config/routes-config"
import { OrderUser } from "../../models/order-user"
import classes from "./OrderListViewSmall.module.css"
import {useEffect, useState} from "react";
import getAvatar from "../../utils/getAvatar";
import {useStore} from "@nanostores/react";
import {userData} from "../../store/UserData";

export const OrderListViewSmall = ({ orderUser }: { orderUser: OrderUser }) => {
    const {order, person} = orderUser
    const link = BASE_PATH_CURRENTORDER + order.id
    const user = useStore(userData)
    const [avatarUrl, setAvatarUrl] = useState("")
    useEffect(()=>{
        if(user.id===person.id){
            setAvatarUrl("/my_order.png")
        } else {
            getAvatar(Number(person.id))
                .then(res=>setAvatarUrl(res))
        }
    }, [])
  return (
    <Link className={classes.orderItem} to={link}>
      <div className={classes.userContainer}>
        <ImageAvatar src={avatarUrl} size={36} />
        <div>
          <p className={classes.userName}>{ user.id != person.id ? `@${person.username}` : "my order"}</p>
          <p className={classes.orderData}>{order.localDateTime?.substring(0, 10)}</p>
        </div>
      </div>
      <div className={classes.info}>
        <p className={classes.infoValueTon}>{order.amount} TON</p>

        {/* нужно будет дописать логику выбора */}
        <p className={classes.statusComleted}>{order.orderStatus}</p>
        {/* <p className={classes.statusСancelled}>{order.status}</p> */}
      </div>
    </Link>
  )
}

export default OrderListViewSmall
