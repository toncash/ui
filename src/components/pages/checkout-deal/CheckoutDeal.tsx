import { Order, OrderType } from "../../../models/order"
import React, { useEffect, useState } from "react"
import classes from "./CheckoutDeal.module.css"
import { PATH_FINDORDERS, PATH_ORDER_CONFIRMATION, PATH_PROFILE } from "../../../config/routes-config"
import { Link, useLocation } from "react-router-dom"
import UserInfoShort from "../../user-info/UserInfoShort"
import { TextField } from "@mui/material"
import { useStore } from "@nanostores/react"
import { userData } from "../../../store/UserData"
import { Deal, DealStatus, getEmptyDeal } from "../../../models/deal"
import { useTonConnect } from "../../../hooks/useTonConnect"
import ButtonBack from "../../buttonBack/ButtonBack"
import styled from "styled-components"

const CssTextField = styled(TextField)({
  "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
    background: "rgba(255, 255, 255, 0.05)",
    color: "#FFFFFF",
    fontSize: "16px",
    lineHeight: "24px",
    paddingTop: "8px",

    input: {
      padding: "0 0 8px 12px",
    },

    p: {
      color: "#fff",
      paddingBottom: "8px",
    },
  },
  "& .css-1tzgnuz-MuiInputBase-root-MuiFilledInput-root ": {
    background: "rgba(255, 255, 255, 0.05)",
    color: "#FFFFFF",
    fontSize: "16px",
    lineHeight: "24px",
    paddingTop: "8px",

    input: {
      padding: "0 0 8px 12px",
    },

    p: {
      color: "#fff",
      paddingBottom: "8px",
    },
  },
  " .css-2y464i-MuiInputBase-root-MuiFilledInput-root:after": {
    borderBottom: "2px solid #fff",
  },
  " .css-1tzgnuz-MuiInputBase-root-MuiFilledInput-root:after": {
    borderBottom: "2px solid #fff",
  },
})

const CheckoutDeal = () => {
  const [amountToPay, setAmountToPay] = useState<number>()
  const [amountToReceive, setAmountToReceive] = useState<number>()
  const [errorAmount, setErrorAmount] = useState("")
  const location = useLocation()
  const user = useStore(userData)
  const { wallet } = useTonConnect()
  const orderUser = location.state

  const order: Order = orderUser?.order
  const [deal, setDeal] = useState<Deal>(getEmptyDeal(order.id as string))

  useEffect(() => {
    deal.addressBuyer = wallet as string
  }, [wallet])

  useEffect(() => {
    deal.dealStatus = DealStatus.CURRENT
    deal.sellerId = order.orderType === OrderType.SELL ? order.ownerId : user.chatId
    deal.buyerId = order.orderType === OrderType.BUY ? order.ownerId : user.chatId
    setDeal({ ...deal })
  }, [])

  function validateFn(amount: number) {
    console.log("amount>order.amount")
    console.log(`${amount}>${order.amount}`)
    if (amount > order.amount) {
      return "Amount too big"
    }

    return ""
  }

  function handleChangeAmountToPay(event: any) {
    const value = Number(event.target.value)
    setAmountToPay(value)
    if (String(order.orderType) === OrderType[OrderType.SELL]) {
      deal.amount = Number((value / order.price).toFixed(2))
      setAmountToReceive(deal.amount)
    } else if (String(order.orderType) === OrderType[OrderType.BUY]) {
      deal.amount = Number(value)
      setAmountToReceive(Number((value * order.price).toFixed(2)))
    }
    const message = validateFn(deal.amount)
    setDeal({ ...deal })
    setErrorAmount(message)
  }

  function handleChangeAmountToReceive(event: any) {
    const value = Number(event.target.value)
    setAmountToReceive(value)
    if (String(order.orderType) === OrderType[OrderType.SELL]) {
      deal.amount = Number(value)
      setAmountToPay(Number((value * order.price).toFixed(2)))
    } else if (String(order.orderType) === OrderType[OrderType.BUY]) {
      deal.amount = Number((value / order.price).toFixed(2))
      setAmountToPay(deal.amount)
    }
    const message = validateFn(deal.amount)
    setDeal({ ...deal })
    setErrorAmount(message)
  }

  return (
    <div className={classes.orderCHeckoutPage}>
      <div>
        <div className={classes.orderHeaders}>
          <ButtonBack />
          <h1 className={classes.orderTitle}>Checkout</h1>
        </div>
        <UserInfoShort user={orderUser.person} order={orderUser.order} />
        <div className={classes.orderAmount}>
          <p>Amount:</p>
          <p>{orderUser.order.amount} TON</p>
        </div>
        <div className={classes.orderCHeckoutItem}>
          <label className={classes.orderCHeckoutItemLabel}>
            {"I want to pay " + (String(order.orderType) === OrderType[OrderType.SELL] ? order.currency : "TON")}
          </label>
          <CssTextField
            id="pay"
            variant="filled"
            fullWidth={true}
            type="number"
            value={amountToPay}
            error={!!errorAmount}
            helperText={errorAmount}
            onChange={handleChangeAmountToPay}
          />
        </div>
        <div className={classes.orderCHeckoutItem}>
          <label className={classes.orderCHeckoutItemLabel}>
            {"I want to receive " + (String(order.orderType) === OrderType[OrderType.SELL] ? "TON" : order.currency)}
          </label>
          <CssTextField
            id="receive"
            variant="filled"
            fullWidth={true}
            type="number"
            value={amountToReceive}
            error={!!errorAmount}
            helperText={errorAmount}
            onChange={handleChangeAmountToReceive}
          />
        </div>
      </div>

      <div className={classes.buttonContainer}>
        <Link to={PATH_FINDORDERS} className={classes.buttonCancel}>
          Cancel
        </Link>
        <Link to={PATH_ORDER_CONFIRMATION} state={{ deal, order }} className={classes.buttonBuyTon}>
          Buy TON
        </Link>
      </div>
    </div>
  )
}

export default CheckoutDeal
