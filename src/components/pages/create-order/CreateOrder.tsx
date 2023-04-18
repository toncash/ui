import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { OrderMapComponent } from "../../map/OrderMapComponent"
import SelectCurrency from "../../Select/SelectCurrency"
import { getEmptyOrder, OrderType } from "../../../models/order"
import { useNavigate } from "react-router-dom"
import { PATH_PROFILE } from "../../../config/routes-config"
import { InputAdornment, TextField } from "@mui/material"
import { MapComponent } from "../../map/MapComponent"
import { ordersService } from "../../../config/service-config"
import { useStore } from "@nanostores/react"
import { userData } from "../../../store/UserData"
import { OrderUser } from "../../../models/order-user"
import { locationData } from "../../../store/Location"
import classes from "./CreateOrder.module.css"
import ButtonBack from "../../buttonBack/ButtonBack"
import { MapView } from "../../map/MapView"

export const TextTitle = styled.div`
  margin: auto;
  padding: 10px 20px;
  color: #fff;
  font-weight: 700;
  font-size: 24px;
`

export const TextCommon = styled.div`
  margin: auto;
  padding: 10px 20px;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
`

const CssTextField = styled(TextField)({
  "& .css-10botns-MuiInputBase-input-MuiFilledInput-input": {
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

type Step = {
  setStep: (step: number) => void
  orderUser: OrderUser
  setOrderUser: (o: OrderUser) => void
}

const StepOne = (props: Step) => {
  const { setStep, orderUser, setOrderUser } = props
  const [errorPriceMessage, setErrorPriceMessage] = useState("")
  const [errorAmountMessage, setErrorAmountMessage] = useState("")
  const navigate = useNavigate()
  function validateFn(value: number) {
    if (value > 0) {
      return ""
    }
    return "Not valid"
  }

  function handleChangePrice(event: any) {
    const enteredPrice = Number(event.target.value)
    const message = validateFn(enteredPrice)
    setErrorPriceMessage(message)
    orderUser.order.price = enteredPrice
    setOrderUser({ ...orderUser })
    console.log(orderUser)
  }

  function handleChangeAmount(event: any) {
    const enteredAmount = Number(event.target.value)
    const message = validateFn(enteredAmount)
    setErrorAmountMessage(message)
    orderUser.order.amount = enteredAmount
    setOrderUser({ ...orderUser })
    console.log(orderUser)
  }

  function handleOrderType(type: OrderType) {
    handleClickSwitchOnlyBitton(type)
    orderUser.order.orderType = type
    setOrderUser({ ...orderUser })
    console.log(orderUser)
  }

  const [viewOnlyFilter, setViewOnlyFilter] = useState<"buy" | "sell">("sell")

  const handleClickSwitchOnlyBitton = (type: Number) => {
    if (type === OrderType.SELL) {
      setViewOnlyFilter("sell")
    } else {
      setViewOnlyFilter("buy")
    }
  }

  const styleActiveOnlyBitton = { zIndex: "1", backgroundColor: "#26272B" }

  const styleDisabledOnlyButton = { color: "#9B9B9B", backgroundColor: "rgba(255, 255, 255, 0.05)" }

  return (
    <div className={classes.createOrderPage}>
      <div className={classes.orderHeaders}>
        <ButtonBack />
        <h1 className={classes.orderTitle}>New order</h1>
      </div>

      <div className={classes.onlyButtonContainer}>
        <button
          onClick={() => handleOrderType(OrderType.SELL)}
          className={classes.onlyButton}
          style={viewOnlyFilter === "sell" ? styleActiveOnlyBitton : styleDisabledOnlyButton}
        >
          Sell
        </button>
        <button
          onClick={() => handleOrderType(OrderType.BUY)}
          className={classes.onlyButton}
          style={viewOnlyFilter === "buy" ? styleActiveOnlyBitton : styleDisabledOnlyButton}
        >
          Buy
        </button>
      </div>

      <div className={classes.createOrderItem}>
        <TextCommon>Currency</TextCommon>
        <SelectCurrency orderUser={orderUser} setOrderUser={setOrderUser} />
      </div>

      <div className={classes.createOrderItem}>
        <TextCommon>Price</TextCommon>
        <CssTextField
          id="order-price"
          variant="filled"
          type="number"
          value={orderUser.order.price ? orderUser.order.price : ""}
          error={!!errorPriceMessage}
          helperText={errorPriceMessage}
          InputProps={{
            endAdornment: <InputAdornment position="end">{orderUser.order.currency}</InputAdornment>,
          }}
          onChange={handleChangePrice}
          fullWidth={true}
        />
      </div>

      <div className={classes.createOrderItem}>
        <TextCommon>Amount</TextCommon>
        <CssTextField
          id="order-amount"
          variant="filled"
          type="number"
          value={orderUser.order.amount ? orderUser.order.amount : ""}
          error={!!errorAmountMessage}
          helperText={errorAmountMessage}
          onChange={handleChangeAmount}
          InputProps={{
            endAdornment: <InputAdornment position="end">TON</InputAdornment>,
          }}
          fullWidth={true}
        />
      </div>

      <div className={classes.buttonContainer}>
        <button
          className={classes.buttonValueCancel}
          onClick={() => {
            navigate(PATH_PROFILE)
          }}
        >
          Cancel
        </button>
        <button
          className={classes.buttonValueCame}
          onClick={() => {
            console.log("next")
            if (orderUser.order.amount == 0) {
              console.log("Amount is empty")
              setErrorAmountMessage("Amount is empty")
              console.log(errorAmountMessage)
            }
            if (orderUser.order.price == 0) {
              console.log("Price is empty")
              setErrorPriceMessage("Price is empty")
              console.log(errorPriceMessage)
            }
            if (orderUser.order.amount != 0 && orderUser.order.price != 0) {
              setStep(1)
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

const StepTwo = (props: Step) => {
  const { orderUser, setOrderUser, setStep } = props
  const [errorLimitMinMessage, setErrorLimitMinMessage] = useState("")
  const [errorLimitMaxMessage, setErrorLimitMaxMessage] = useState("")
  const navigate = useNavigate()
  const location = useStore(locationData)
  function validateFn(value: number) {
    if (value > 0) {
      return ""
    }
    return "Not valid"
  }

  return (
    <div className={classes.createOrderPage}>
      <div className={classes.orderHeaders}>
        <ButtonBack />
        <h1 className={classes.orderTitle}>New order</h1>
      </div>

      <MapView order={orderUser.order} startLocation={location} />

      <button onClick={() => setStep(2)} className={classes.buttonLocation}>
        Choose your location:
      </button>
      <div className={classes.createOrderItem}>
        <div className={classes.buttonContainer}>
          <button
            className={classes.buttonValueCancel}
            onClick={() => {
              setStep(0)
            }}
          >
            Cancel
          </button>
          <button
            className={classes.buttonValueCame}
            onClick={async () => {
              if (
                (orderUser.order.limit.max === 0 && orderUser.order.limit.min === 0) ||
                orderUser.order.limit.max > orderUser.order.limit.min
              ) {
                setErrorLimitMaxMessage("")
                setErrorLimitMinMessage("")

                const res = await ordersService.addOrder(orderUser.order)
                navigate(PATH_PROFILE)
                console.log(res)
              } else if (orderUser.order.limit.max <= orderUser.order.limit.min) {
                setErrorLimitMaxMessage("Max must be more than min")
                setErrorLimitMinMessage("Max must be more than min")
              }
            }}
          >
            Сonfirm
          </button>
        </div>
      </div>
    </div>
  )
}

export const CreateOrder = () => {
  const [step, setStep] = useState(0)
  const user = useStore(userData)
  const location = useStore(locationData)
  const [orderUser, setOrderUser] = useState<OrderUser>({
    order: getEmptyOrder(location),
    person: user,
  })

  useEffect(() => {
    orderUser.order.ownerId = Number(user.chatId)
    setOrderUser({ ...orderUser })
  }, [])

  if (step === 0) {
    return <StepOne setStep={setStep} orderUser={orderUser} setOrderUser={setOrderUser} />
  }

  if (step === 1) {
    // return <MapComponent orders={[order]}/>
    return <StepTwo setStep={setStep} orderUser={orderUser} setOrderUser={setOrderUser} />
  }

  return <OrderMapComponent orderUser={orderUser} setOrderUser={setOrderUser} setStep={setStep} />
}
