import { ImageAvatar } from "@twa-dev/mark42"
import { Link } from "react-router-dom"
import { BASE_PATH_CURRENTORDER, BASE_PATH_DEAL } from "../../config/routes-config"
import classes from "./DealListViewSmall.module.css"

export const DealListViewSmall = ({ order }: { order: any }) => {
  const link = BASE_PATH_DEAL + order.id

  return (
    <Link className={classes.orderItem} to={link}>
      <div className={classes.userContainer}>
        <ImageAvatar src={order.src} size={36} />
        <div>
          <p className={classes.userName}>@{order.buyerId}</p>
          <p className={classes.orderData}>{order.data}</p>
        </div>
      </div>
      <div className={classes.info}>
        <p className={classes.infoValueTon}>{order.amount} TON</p>

        {/* нужно будет дописать логику выбора */}

        {/* <p className={classes.statusComleted}>{order.status}</p>
        <p className={classes.statusСancelled}>{order.status}</p> */}
      </div>
    </Link>
  )
}

export default DealListViewSmall
