import styled from "styled-components";
import {useEffect, useState} from "react";
import { OrderMapComponent } from "../map/OrderMapComponent";
import SelectCountry from "../Select/SelectCountry";
import { FlexBoxCol, Input } from "../styled/styled";
import { ButtonOrder, FlexBoxRow1 } from "./Profile"
import {MapComponent} from "../map/MapComponent";
import Order from "../../models/order";
import {ordersService} from "../../config/service-config";
// import SelectCurrency from '../../../src'

export const TextTitle = styled.div`
margin:   auto;
padding: 10px 20px;
color: black;
font-weight: 700;
font-size: 24px;
color: var(--tg-theme-button-color) ;
`;

export const TextCommon = styled.div`
margin:   auto;
padding: 10px 20px;
color: black;
font-weight: 700;
font-size: 20px;
`;

export const FindOrder = () => {
    let [allOrders, setAllOrders] = useState<Order []>([])

    async function getData(){
        const data = await ordersService.getOrdersByUser(1234)
        console.log(data)
        setAllOrders(data)

        console.log('allOrders')
        console.log(allOrders)
    }

    useEffect(()=>{
        getData()
    }, [])


    return (
        <FlexBoxCol>
            <TextTitle>Find order</TextTitle>
            {allOrders.length>0?
                <MapComponent orders={allOrders}/>
                : <div></div>}


        </FlexBoxCol>
    )
}