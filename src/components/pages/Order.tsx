import styled from "styled-components";
import { FlexBoxCol, Input } from "../styled/styled";
import { ButtonOrder, FlexBoxRow1 } from "./MainInfo"
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


export const Order = () => {
    return (
        <FlexBoxCol>
            <TextTitle>New order</TextTitle>
            <FlexBoxRow1>
                <ButtonOrder onClick={() => { console.log('sell') }}>I want sell</ButtonOrder>
                <ButtonOrder onClick={() => { console.log('buy') }}>I want buy</ButtonOrder>
            </FlexBoxRow1>
            <TextCommon>Currency</TextCommon>
            {/* <SelectCurrency value={'USD'} /> */}
            <FlexBoxRow1>
                <TextCommon>Price</TextCommon>
                <TextCommon>Amount</TextCommon>
            </FlexBoxRow1>
            <FlexBoxRow1>
                <Input value={'2,4'}></Input>
                <Input value={'1000 TON'}></Input>
            </FlexBoxRow1>
            <FlexBoxRow1>
                <ButtonOrder onClick={() => { console.log('cancel') }}>Cancel</ButtonOrder>
                <ButtonOrder onClick={() => { console.log('next') }}> Next</ButtonOrder>
            </FlexBoxRow1>
        </FlexBoxCol>
    )
}