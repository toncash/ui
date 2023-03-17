import {ImageAvatar} from "@twa-dev/mark42"
import {Link} from "react-router-dom"
import {BASE_PATH_CURRENTORDER} from "../../config/routes-config"
import {OrderUser} from "../../models/order-user"
import classes from "./OrderListViewSmall.module.css"
import React, {useState} from "react";
import {Deal} from "../../models/deal";
import DealListViewSmall from "../dealListViewSmall/DealListViewSmall";
import {usersService} from "../../config/service-config";
import Order, {OrderType} from "../../models/order";

function getDealOwner(order: Order, deal: Deal) {
    let userId
    if(order.orderType==OrderType.SELL){
        userId = deal.sellerId
    } else {
        userId = deal.buyerId
    }

    return usersService.getUser(String(userId))
}

export const OrderListViewSmall = ({ order }: { order: Order }) => {

    const link = BASE_PATH_CURRENTORDER + order.id
    const [avatarUrl, setAvatarUrl] = useState("/my_order.png")
    const [currentDeals, setCurrentDeals] = useState<Deal [] | undefined>(order.deals)
    const getDeals = async () => {
        if(currentDeals){
            return currentDeals.map( async (deal, index) => {
                const person = await getDealOwner(order, deal)
                return <DealListViewSmall dealUser={{
                    deal,
                    person
                }}/>
            })
        }
    }
  return (
    <Link className={classes.orderItem} to={link}>
      <div className={classes.userContainer}>
        <ImageAvatar src={avatarUrl} size={36} />
        <div>
          <p className={classes.userName}>{"my order"}</p>
          <p className={classes.orderData}>{order.localDateTime?.substring(0, 10)}</p>
        </div>
      </div>
      <div className={classes.info}>
        <p className={classes.infoValueTon}>{order.amount} TON</p>

        {/* нужно будет дописать логику выбора */}
        <p className={classes.statusComleted}>{order.orderStatus}</p>
      </div>
    </Link>
  )
}

export default OrderListViewSmall
