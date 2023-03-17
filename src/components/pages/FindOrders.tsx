import React, { useEffect, useState } from "react"
import { Button, TextCommon } from "../styled/styled"
import OrderListView from "../orderListView/OrderListView"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import IconButton from "@mui/material/IconButton"
import { useNavigate } from "react-router-dom"
import { ordersUserService } from "../../config/service-config"
import { MapComponent } from "../map/MapComponent"
import { OrderUser } from "../../models/order-user"
import { useStore } from "@nanostores/react"
import { locationData } from "../../store/Location"

const FindOrders = () => {
  const navigate = useNavigate()
  function order(username: string, amount: number, price: number, currency: string, orderType: string) {
    return { username, amount, price, currency, orderType }
  }
  let [allOrders, setAllOrders] = useState<OrderUser[]>([])
  const [viewMode, setViewMode] = useState<"list" | "map">("map")

  const location = useStore(locationData)

  async function getData() {
    console.log(location)
    const data = await ordersUserService.getOrderUsersByGeo(location.x, location.y)
    console.log("allOrders2")
    console.log(data)
    setAllOrders(data)
  }

  useEffect(() => {
    getData()
  }, [location])

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div className="headerFindOrders" style={{ display: "flex", flexDirection: "row" }}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <TextCommon>Orders</TextCommon>
      </div>
      <Button
        onClick={() => {
          setViewMode("map")
        }}
        style={{ marginTop: 20, width: "100%", background: "green" }}
      >
        Open map
      </Button>

      {viewMode === "map" ? (
        <MapComponent ordersUsers={allOrders} />
      ) : (
        allOrders.map(orderUser => <OrderListView orderUser={orderUser} key={orderUser.order.id} />)
      )}
    </div>
  )
}

export default FindOrders
