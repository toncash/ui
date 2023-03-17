import React, { useEffect, useState } from "react"
import OrderListView from "../../orderListView/OrderListView"
import { ordersService, ordersUserService } from "../../../config/service-config"
import Order from "../../../models/order"
import { MapComponent } from "../../map/MapComponent"
import classes from "./FindOrders.module.css"
import { Link } from "react-router-dom"
import { PATH_PROFILE } from "../../../config/routes-config"
import { useStore } from "@nanostores/react"
import { userData } from "../../../store/UserData"
import ButtonBack from "../../buttonBack/ButtonBack"
import { locationData } from "../../../store/Location"
import { OrderUser } from "../../../models/order-user"

const FindOrders = () => {
  function order(username: string, amount: number, price: number, currency: string, orderType: string) {
    return { username, amount, price, currency, orderType }
  }
  let [allOrders, setAllOrders] = useState<OrderUser[]>([])
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  const user = useStore(userData)
  const location = useStore(locationData)
  async function getData() {
    const data = await ordersUserService.getOrderUsersByGeo(location.x, location.y)
    console.log("allOrders2")
    console.log(data)
    setAllOrders(data)
  }

  useEffect(() => {
    getData()
  }, [location])

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
      <ButtonBack />
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
        <MapComponent ordersUsers={allOrders} />
      ) : (
        <div className={classes.viewListOrdersContainer}>
          {allOrders.map(orderUser => (
            <OrderListView orderUser={orderUser} key={orderUser.order.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FindOrders
