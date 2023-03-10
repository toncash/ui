import React, { useEffect, useState } from "react"
import classes from "./History.module.css"
import OrderListViewSmall from "../../orderListViewSmall/OrderListViewSmall"
import ButtonBack from "../../buttonBack/ButtonBack"

const History = () => {
  //  подставить правильный запрос апи

  // async function getData() {
  //     const data = await ordersService.getOrdersByUser(Number(user.id))
  //     setAllOrders(data)
  //   }

  //   const [arrayOrder, setArrayOrder] = useState<Order[]>([])

  //   useEffect(() => {
  //     getData()
  //   }, [])

  const arrayOrder = [
    {
      src: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png",
      id: 32,
      buyerId: "katya_ulyanova ",
      amount: "10 000",
      status: "Сompleted",
      data: "23.01.2023",
    },
    {
      src: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png",
      id: 32,
      buyerId: "katya_ulyanova ",
      amount: "10 000",
      status: "Сompleted",
      data: "23.01.2023",
    },
    {
      src: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png",
      id: 32,
      buyerId: "katya_ulyanova ",
      amount: "10 000",
      status: "Сompleted",
      data: "23.01.2023",
    },
    {
      src: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png",
      id: 32,
      buyerId: "katya_ulyanova ",
      amount: "10 000",
      status: "Сompleted",
      data: "23.01.2023",
    },
    {
      src: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png",
      id: 32,
      buyerId: "katya_ulyanova ",
      amount: "10 000",
      status: "Сompleted",
      data: "23.01.2023",
    },
  ]

  const [viewOnlyFilter, setViewOnlyFilter] = useState<"buy" | "sell">("sell")

  const handleClickSwitchOnlyBitton = () => {
    if (viewOnlyFilter === "buy") {
      setViewOnlyFilter("sell")
    } else {
      setViewOnlyFilter("buy")
    }
  }

  const styleActiveOnlyBitton = { zIndex: "1", backgroundColor: "#26272B" }

  const styleDisabledOnlyButton = { color: "#9B9B9B", backgroundColor: "rgba(255, 255, 255, 0.05)" }

  const getArray = () => {
    return arrayOrder.map((item, index) => {
      return <OrderListViewSmall order={item} key={index}></OrderListViewSmall>
    })
  }

  return (
    <section className={classes.history}>
      <div className={classes.historyHeaders}>
        <ButtonBack />
        <h1 className={classes.historyTitle}>History</h1>
      </div>
      <div className={classes.onlyButtonContainer}>
        <button
          onClick={handleClickSwitchOnlyBitton}
          className={classes.onlyButton}
          style={viewOnlyFilter === "sell" ? styleActiveOnlyBitton : styleDisabledOnlyButton}
        >
          Only sell
        </button>
        <button
          onClick={handleClickSwitchOnlyBitton}
          className={classes.onlyButton}
          style={viewOnlyFilter === "buy" ? styleActiveOnlyBitton : styleDisabledOnlyButton}
        >
          Only buy
        </button>
      </div>
      <input className={classes.searchInput} placeholder="Search"></input>
      <div className={classes.viewListOrdersContainer}>{getArray()}</div>
    </section>
  )
}

export default History
