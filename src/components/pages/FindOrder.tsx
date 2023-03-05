import styled from "styled-components";
import { useState } from "react";
import { OrderMapComponent } from "../map/OrderMapComponent";
import SelectCountry from "../Select/SelectCountry";
import { FlexBoxCol, Input } from "../styled/styled";
import { ButtonOrder, FlexBoxRow1 } from "./Profile"
import {MapComponent} from "../map/MapComponent";
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
            <MapComponent/>

        </FlexBoxCol>
    )
}