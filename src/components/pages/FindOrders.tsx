import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Button, TextCommon } from "../styled/styled"
import { orders } from "../test_data/data"
import OrderListView from "../OrderListView"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import IconButton from "@mui/material/IconButton"
import { PATH_FINDORDER } from "../../config/routes-config"
import { ButtonOrder } from "./profile/Profile"
import { useNavigate } from "react-router-dom"
import Orders from "../../service/orders"
import { ordersService } from "../../config/service-config"
import Order from "../../models/order"
import { MapComponent } from "../map/MapComponent"

const FindOrders = () => {
  const navigate = useNavigate()
  function order(username: string, amount: number, price: number, currency: string, orderType: string) {
    return { username, amount, price, currency, orderType }
  }
  let [allOrders, setAllOrders] = useState<Order[]>([])
  const [viewMode, setViewMode] = useState<"list" | "map">("map")

  async function getData() {
    const data = await ordersService.getOrdersByUser(1234)
    console.log("allOrders2")
    console.log(data)
    setAllOrders(data)
  }

  useEffect(() => {
    getData()
  }, [])

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
        <MapComponent orders={allOrders} />
      ) : (
        allOrders.map(order => <OrderListView order={order} key={order.buyerId} />)
      )}
    </div>
  )
}

export default FindOrders
