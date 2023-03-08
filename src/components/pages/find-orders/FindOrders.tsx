import React, { useEffect, useState } from "react"
import OrderListView from "../../orderListView/OrderListView"
import { ordersService } from "../../../config/service-config"
import Order from "../../../models/order"
import { MapComponent } from "../../map/MapComponent"
import classes from "./FindOrders.module.css"
import { Link } from "react-router-dom"
import { PATH_PROFILE } from "../../../config/routes-config"

const FindOrders = () => {
  function order(username: string, amount: number, price: number, currency: string, orderType: string) {
    return { username, amount, price, currency, orderType }
  }
  let [allOrders, setAllOrders] = useState<Order[]>([])
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  async function getData() {
    const data = await ordersService.getOrdersByUser(1234)
    console.log("allOrders2")
    console.log(data)
    setAllOrders(data)
  }

  useEffect(() => {
    getData()
  }, [])

  const [viewOnlyFilter, setViewOnlyFilter] = useState<"buy" | "sell">("sell")

  const handleClickSwitchMapButton = () => {
    if (viewMode === "map") {
      setViewMode("list")
    } else {
      setViewMode("map")
    }
  }

  const handleClickSwitchOnlyBitton = () => {
    if (viewOnlyFilter === "buy") {
      setViewOnlyFilter("sell")
    } else {
      setViewOnlyFilter("buy")
    }
  }

  const styleActiveOnlyBitton = { zIndex: "1", backgroundColor: "#FFFFFF" }

  const styleDisabledOnlyButton = { backgroundColor: "#1E1E25", color: "#FFFFFF" }

  return (
    <div className={classes.orders}>
      <Link className={classes.backButton} to={PATH_PROFILE}>
        go back
      </Link>
      <div className={classes.ordersHeaders}>
        <h1 className={classes.ordersTitle}>Find order</h1>
        <button className={classes.changeMapButton} onClick={handleClickSwitchMapButton}>
          {viewMode === "map" ? "Open a list" : "Open map"}
        </button>
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
      {viewMode === "map" ? (
        <MapComponent orders={allOrders} />
      ) : (
        <div className={classes.viewListOrdersContainer}>
          {allOrders.map(order => (
            <OrderListView order={order} key={order.buyerId} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FindOrders
