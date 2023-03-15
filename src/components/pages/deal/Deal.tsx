import classes from "./Deal.module.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { ImageAvatar } from "@twa-dev/mark42"
import ButtonBack from "../../buttonBack/ButtonBack"
import { MapView } from "../../map/MapView"

const Deal = () => {
  const [order, setOrder] = useState({
    src: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png",
    id: 32,
    buyerId: "katya_ulyanova ",
    amount: "10 000",
    status: "Сompleted",
    data: "23.01.2023",
    location: "al. Tadeusza Kościuszki 49/51, 90-514 Łódź, Poland",
    x: 55.7478993,
    y: 37.673359,
  })

  //  TO DO подставить правильный запрос апи

  // async function getData() {
  //     const data = await ordersService.getOrdersByUser(Number(user.id))
  //     setOrder(data)
  //   }

  //   useEffect(() => {
  //     getData()
  //   }, [])

  return (
    <section className={classes.orderPage}>
      <div className={classes.orderHeaders}>
        <ButtonBack />
        <h1 className={classes.orderTitle}>Deal</h1>
      </div>
      <div className={classes.orderItem}>
        <div className={classes.userContainer}>
          <ImageAvatar src={order?.src} size={57} />
          <div>
            <p className={classes.userName}>@{order?.buyerId}</p>
            {/* <p className={classes.statusComleted}>{order?.status}</p> */}
          </div>
        </div>
        <Link className={classes.chatLink} to="/user-chat">
          See Chat
        </Link>
      </div>

      <div className={classes.infoContainer}>
        <div className={classes.infoItem}>
          <p className={classes.infoItemTitle}>Price:</p>
          <p className={classes.infoItemValue}>{order?.amount}</p>
        </div>

        <div className={classes.infoItem}>
          <p className={classes.infoItemTitle}>I want to pay:</p>
          <p className={classes.infoItemValue}>{order?.amount}</p>
        </div>

        <div className={classes.infoItem}>
          <p className={classes.infoItemTitle}>I will receive:</p>
          <p className={classes.infoItemValue}>{order?.amount}</p>
        </div>

        <div className={classes.infoItem}>
          <p className={classes.infoItemTitle}>Location order:</p>
          <p className={classes.infoItemValue}>{order?.location}</p>
        </div>
      </div>
      <MapView x={order.x} y={order.y} />
      <div className={classes.buttonContainer}>
        <button className={classes.buttonValueCancel}>Deny</button>
        <button className={classes.buttonValueCame}>Accept</button>
      </div>
    </section>
  )
}

export default Deal
