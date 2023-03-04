import styled from "styled-components";
import { useState } from "react";
import { OrderMapComponent } from "../map/OrderMapComponent";
import SelectCountry from "../Select/SelectCountry";
import { FlexBoxCol, Input } from "../styled/styled";
import { ButtonOrder, FlexBoxRow1 } from "./Profile"
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

    return (
        <FlexBoxCol>
            <TextTitle>Find order</TextTitle>
            <OrderMapComponent location={{ lat: -3.745, lng: -38.523 }} />
            <FlexBoxRow1>
                <ButtonOrder onClick={() => { console.log('sell') }}>I want sell</ButtonOrder>
                <ButtonOrder onClick={() => { console.log('buy') }}>I want buy</ButtonOrder>
            </FlexBoxRow1>
            <TextCommon>Currency</TextCommon>
            <SelectCountry />
                <FlexBoxRow1>
                    <TextCommon>Price</TextCommon>
                    <TextCommon>Amount</TextCommon>
                </FlexBoxRow1>
                <FlexBoxRow1>
                    <Input value={'2,4'}></Input>
                    <Input value={'1000 TON'}></Input>
                </FlexBoxRow1>
                <FlexBoxRow1>
                    <ButtonOrder onClick={() => { console.log('cancel') }} style={{ background: 'red' }}>Cancel</ButtonOrder>
                    <ButtonOrder onClick={() => { console.log('next') }}> Next</ButtonOrder>
                </FlexBoxRow1>
        </FlexBoxCol>
    )
}