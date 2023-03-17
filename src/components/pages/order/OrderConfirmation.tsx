import { Order, OrderType } from "../../../models/order"
import User from "../../../models/user"
import React, { useState } from "react"
import classes from "./OrderConfirmation.module.css"
import { PATH_PROFILE } from "../../../config/routes-config"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../../styled/styled"
import { OrderUser } from "../../../models/order-user"
import { Deal } from "../../../models/deal"
import ButtonBack from "../../buttonBack/ButtonBack"
import { dealsService, ordersService } from "../../../config/service-config"
import { useStore } from "@nanostores/react"
import { userData } from "../../../store/UserData"

type CheckoutProps = {
  order: Order
  orderOwner: User
}

const OrderConfimation = () => {
  const location = useLocation()
  const deal: Deal = location.state

  const order: Order = location.state.order
  const navigate = useNavigate()
  const user = useStore(userData)

  async function dealRequest(ownerId: string, deal: Deal) {
    // TODO
    // ordersService.addOrder()
    const res = await dealsService.offerDeal(ownerId, deal)
    console.log(res)
  }

  function showPopup() {
    // TODO
  }

  // TODO дописать логику кнопки конфирм

  const handleConfirm = async () => {
    await dealRequest(user.id.toString(), deal)
    showPopup()
    navigate(PATH_PROFILE)
  }

  return (
    <div className={classes.orderConfimationPage}>
      <div>
        <div className={classes.orderHeaders}>
          <ButtonBack />
          <h1 className={classes.orderTitle}>Order confirmation</h1>
        </div>

        {/* TODO добавить значение комисии */}

        <div className={classes.infoContainer}>
          <div className={classes.infoItem}>
            <p>Amount:</p>
            <p>{deal.amount} TON</p>
          </div>
          <div className={classes.infoItem}>
            <p>Amount::</p>
            <p>
              {deal.amount * order.price} {order.currency}
            </p>
          </div>
        </div>
      </div>

      <div className={classes.buttonContainer}>
        <button className={classes.buttonValueCancel} onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button className={classes.buttonValueCame} onClick={handleConfirm}>
          Сonfirm
        </button>
      </div>
    </div>
  )
}

export default OrderConfimation
