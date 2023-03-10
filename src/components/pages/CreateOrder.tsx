import styled from "styled-components"
import React, {useEffect, useState} from "react"
import {OrderMapComponent} from "../map/OrderMapComponent"
import SelectCurrency from "../Select/SelectCurrency"
import {FlexBoxCol} from "../styled/styled"
import Order, {getEmptyOrder, OrderType} from "../../models/order";
import {ButtonOrder, FlexBoxRow1} from "./profile/Profile"
import {useNavigate} from "react-router-dom";
import {PATH_PROFILE} from "../../config/routes-config";
import {Button, TextField} from "@mui/material";
import {MapComponent} from "../map/MapComponent";
import {ordersService} from "../../config/service-config";
import {useStore} from "@nanostores/react";
import {userData} from "../../store/UserData";
import User from "../../models/user";
import {OrderUser} from "../../models/order-user";
import {locationData} from "../../store/Location";
// import SelectCurrency from '../../../src'

export const TextTitle = styled.div`
  margin: auto;
  padding: 10px 20px;
  color: black;
  font-weight: 700;
  font-size: 24px;
  color: var(--tg-theme-button-color);
`

export const TextCommon = styled.div`
  margin: auto;
  padding: 10px 20px;
  color: black;
  font-weight: 700;
  font-size: 20px;
`
type Step = {
    setStep: (step: number)=>void,
    orderUser: OrderUser,
    setOrderUser: (o: OrderUser)=>void,
}

const StepOne = (props: Step) => {
    const {setStep, orderUser, setOrderUser} = props
    const [errorPriceMessage, setErrorPriceMessage] = useState("")
    const [errorAmountMessage, setErrorAmountMessage] = useState("")
    const navigate = useNavigate()
    function validateFn(value: number){
        if (value>0){
            return ""
        }
        return "Not valid"
    }

    function handleChangePrice(event: any){
        const enteredPrice = Number(event.target.value);
        const message = validateFn(enteredPrice)
        setErrorPriceMessage(message)
        orderUser.order.price = enteredPrice
        setOrderUser({...orderUser})
        console.log(orderUser)
    }

    function handleChangeAmount(event: any){
        const enteredAmount = Number(event.target.value);
        const message = validateFn(enteredAmount)
        setErrorAmountMessage(message)
        orderUser.order.amount = enteredAmount
        setOrderUser({...orderUser})
        console.log(orderUser)
    }

    function handleOrderType(type: OrderType){
        orderUser.order.orderType = type
        setOrderUser({...orderUser})
        console.log(orderUser)
    }

    return (<FlexBoxCol>
        <TextTitle>New order</TextTitle>
        <FlexBoxRow1>
            <ButtonOrder
                onClick={() => {
                    handleOrderType(OrderType.SELL)
                }}
            >
                I want sell
            </ButtonOrder>
            <ButtonOrder
                onClick={() => {
                    handleOrderType(OrderType.BUY)
                }}
            >
                I want buy
            </ButtonOrder>
        </FlexBoxRow1>

        <TextCommon>Currency</TextCommon>
        <SelectCurrency orderUser={orderUser} setOrderUser={setOrderUser}/>
        <FlexBoxRow1>
            <TextCommon>Price</TextCommon>
            <TextCommon>Amount</TextCommon>
        </FlexBoxRow1>
        <FlexBoxRow1>
            <TextField
                id="order-price"
                label="Price"
                variant="outlined"
                type="number"
                value={orderUser.order.price?orderUser.order.price:''}
                error={!!errorPriceMessage}
                helperText={errorPriceMessage}
                onChange={handleChangePrice} />
            <TextField
                id="order-amount"
                label="Amount"
                variant="outlined"
                type="number"
                value={orderUser.order.amount?orderUser.order.amount:''}
                error={!!errorAmountMessage}
                helperText={errorAmountMessage}
                onChange={handleChangeAmount} />
        </FlexBoxRow1>
        <FlexBoxRow1>
            <ButtonOrder
                onClick={() => {
                    console.log("cancel")
                    navigate(PATH_PROFILE)
                }}
                style={{ background: "red" }}
            >
                Cancel
            </ButtonOrder>
            <ButtonOrder
                onClick={() => {
                    console.log("next")
                    if(orderUser.order.amount==0){
                        console.log("Amount is empty")
                        setErrorAmountMessage("Amount is empty")
                        console.log(errorAmountMessage)
                    }
                    if(orderUser.order.price==0){
                        console.log("Price is empty")
                        setErrorPriceMessage("Price is empty")
                        console.log(errorPriceMessage)
                    }
                    if(orderUser.order.amount!=0 && orderUser.order.price!=0) {
                        setStep(1)
                    }
                }}
            >
                {" "}
                Next
            </ButtonOrder>
        </FlexBoxRow1>


    </FlexBoxCol>)
}

const StepTwo = (props: Step)=>{
    const {orderUser, setOrderUser, setStep} = props
    const [errorLimitMinMessage, setErrorLimitMinMessage] = useState("")
    const [errorLimitMaxMessage, setErrorLimitMaxMessage] = useState("")

    function validateFn(value: number){
        if (value>0){
            return ""
        }
        return "Not valid"
    }

    function handleChangeLimitMin(event: any){
        const limitMin = Number(event.target.value);
        const message = validateFn(limitMin)
        setErrorLimitMinMessage(message)
        orderUser.order.limit.min = limitMin
        setOrderUser({...orderUser})
    }

    function handleChangeLimitMax(event: any){
        const limitMax = Number(event.target.value);
        const message = validateFn(limitMax)
        setErrorLimitMaxMessage(message)
        orderUser.order.limit.max = limitMax
        setOrderUser({...orderUser})
    }

    return <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <MapComponent ordersUsers={[orderUser]}/>
        <FlexBoxCol>

            <Button color={"error"} onClick={()=>setStep(2)}>Choose your location</Button>
            <TextTitle>Limits</TextTitle>
        <FlexBoxRow1>
            <TextField
                id="limit-min"
                label="Min"
                variant="outlined"
                type="number"
                value={orderUser.order.limit.min?orderUser.order.limit.min:''}
                error={!!errorLimitMinMessage}
                helperText={errorLimitMinMessage}
                onChange={handleChangeLimitMin} />
            <TextField
                id="limit-max"
                label="Max"
                variant="outlined"
                type="number"
                value={orderUser.order.limit.max?orderUser.order.limit.max:''}
                error={!!errorLimitMaxMessage}
                helperText={errorLimitMaxMessage}
                onChange={handleChangeLimitMax} />
            {/*<Input value={order.limit.min} onChange={handleChangeLimitMin}></Input>*/}
        </FlexBoxRow1>
        <FlexBoxRow1>
            <ButtonOrder
                onClick={() => {
                    console.log("cancel")
                    setStep(0)
                }}
                style={{ background: "red" }}
            >
                Previous
            </ButtonOrder>
            <ButtonOrder
                onClick={async () => {

                    if((orderUser.order.limit.max === 0 && orderUser.order.limit.min === 0) || orderUser.order.limit.max>orderUser.order.limit.min){
                        setErrorLimitMaxMessage("")
                        setErrorLimitMinMessage("")

                        const res = await ordersService.addOrder(orderUser.order)
                        console.log(res)
                    } else if(orderUser.order.limit.max<=orderUser.order.limit.min){
                        setErrorLimitMaxMessage("Max must be more than min")
                        setErrorLimitMinMessage("Max must be more than min")
                    }

                }}
            >
                {" "}
                Publish
            </ButtonOrder>
        </FlexBoxRow1>
    </FlexBoxCol>
    </div>
}


export const CreateOrder = () => {
    const [step, setStep] = useState(0)
    const user = useStore(userData)
    const location = useStore(locationData)
    const [orderUser, setOrderUser] = useState<OrderUser>({
        order: getEmptyOrder(location),
        person: user
    })

    useEffect(()=>{
        orderUser.order.ownerId = Number(user.id)
        setOrderUser({...orderUser})
    }, [])



    if(step===0){
        return <StepOne setStep={setStep} orderUser={orderUser} setOrderUser={setOrderUser}/>
    }

    if(step===1){
        // return <MapComponent orders={[order]}/>
        return <StepTwo setStep={setStep} orderUser={orderUser} setOrderUser={setOrderUser}/>
    }

    return <OrderMapComponent orderUser={orderUser} setOrderUser={setOrderUser} setStep={setStep} />
}
