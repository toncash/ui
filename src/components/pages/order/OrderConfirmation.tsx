import { Order, OrderType } from "../../../models/order"
import User from "../../../models/user"
import React, {useEffect, useState} from "react"
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
import PopupCongratulations from "../../popup/PopupCongratulations";
import PopupUnfortunately from "../../popup/PopupUnfortunately";

type CheckoutProps = {
  order: Order
  orderOwner: User
}

const OrderConfimation = () => {
  const location = useLocation()
  const deal: Deal = location.state.deal
  console.log(location)
  const order: Order = location.state.order
  const navigate = useNavigate()
  const user = useStore(userData)
  const [amountToPay, setAmountToPay] = useState<number>()
  const [amountToReceive, setAmountToReceive] = useState<number>()
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  useEffect(()=>{
    if(String(order.orderType) === OrderType[OrderType.SELL]){
      setAmountToReceive(deal.amount)
      setAmountToPay(deal.amount * order.price)
    }
  }, [])

  // TODO дописать логику кнопки конфирм

  const handleConfirm = async () => {
  try{
    await dealsService.offerDeal(user.chatId.toString(), deal)
    setSuccess(true)
  } catch (e){
    console.log(e)
    await setError(true)
  }

    // navigate(PATH_PROFILE)
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
            <p>I want to pay:</p>
            <p>
              {amountToPay}
              {(String(order.orderType) === OrderType[OrderType.SELL] ? order.currency : "TON")}
            </p>
          </div>
          <div className={classes.infoItem}>
            <p>I want to receive:</p>
            <p>
              {amountToReceive}
              {(String(order.orderType) === OrderType[OrderType.SELL] ? " TON" : order.currency)}
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

      <PopupCongratulations flag={success} hidePopup={()=>{
        setSuccess(false)
        navigate(PATH_PROFILE)
      }}/>

      <PopupUnfortunately flag={error} hidePopup={()=>{
        setError(false)
        navigate(PATH_PROFILE)
      }}/>
    </div>
  )
}

export default OrderConfimation
