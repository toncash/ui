import { ImageAvatar } from '@twa-dev/mark42';
import styled from 'styled-components';
import { Button, FlexBoxCol, FlexBoxRow } from '../styled/styled';
import { LoginStyle } from './Login';
import { MapComponent } from '../map/MapComponent';
import {TonConnectButton} from "@tonconnect/ui-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {PATH_CREATEORDER, PATH_FINDORDERS} from '../../config/routes-config';

// type AuthType = {

// }


// : React.FC<AuthType> 

// const AuthStyle = styled.div`
//   max-width: 1400px;
//   margin: 0 auto;
// `;

export const ButtonOrder = styled.button`

  background-color: ${(props) =>
        props.disabled ? "#6e6e6e" : "var(--tg-theme-button-color)"};
  border: 0;
  border-radius: 8px;
  padding: 10px 20px;
  color: var(--tg-theme-button-text-color);
  font-weight: 700;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};
  min-width: 150px;
  width:49%;
  height: 50px;
  font-size: 20px; 
`;

export const FlexBoxRow1 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3%;
  align-items: center;
`;





export const CenterImg = styled.div`
margin: auto;
`;
export const UserName = styled.div`
margin:  0 auto;
padding: 10px 20px;
color: black;
font-weight: 700;
`;

export const Indicators = styled.div`
margin:  0 auto;
color: black;
font-weight: 700;
`;


export const Profile = () => {

    const navigate = useNavigate();

    return (
        <LoginStyle>

            <FlexBoxCol>

                <CenterImg>
                    <ImageAvatar src='https://api.telegram.org/file/bot6274692659:AAE8iBiGQdXJczgmig85FBbTzxwwZ1k3rhY/photos/file_0.jpg' size={200} style={{
                        marginTop:50
                    }} />
                </CenterImg>
                <UserName>@userName</UserName>   
                <FlexBoxRow1>
                    <Indicators>
                        Balance:
                        <span>10</span>
                    </Indicators>

                    <Indicators>
                        Comunity:
                        <span>1</span>
                    </Indicators>
                </FlexBoxRow1>
                <Button onClick={()=>{console.log('Current orders')}} style={{ minWidth: 300, height: 50, fontSize: 20 }}>Current orders</Button>
                <FlexBoxRow1>
                    <ButtonOrder onClick={()=> {navigate(PATH_CREATEORDER)}}>Make order</ButtonOrder>
                    <ButtonOrder onClick={()=> {navigate(PATH_FINDORDERS)}}>Find order</ButtonOrder>
                </FlexBoxRow1>

                {/* <MapComponent/> */}

            </FlexBoxCol>


        </LoginStyle>
    )
}