import { ImageAvatar } from '@twa-dev/mark42';
import React, { FC } from 'react';
import { Button } from '../styled/styled';
import { TonConnectButton } from "@tonconnect/ui-react";
import styled from 'styled-components';
import { CenterImg, UserName } from './MainInfo';
// type AuthType = {

// }


// : React.FC<AuthType> 

export const AuthStyle = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;


export const Auth = () => {
  return (
    <AuthStyle>
      <CenterImg>
        <ImageAvatar src='https://api.telegram.org/file/bot6274692659:AAE8iBiGQdXJczgmig85FBbTzxwwZ1k3rhY/photos/file_0.jpg' size={300} style={{
          marginTop: 50
        }} />
      </CenterImg>
      <UserName>@userName</UserName>
      <TonConnectButton style={{ minWidth: 300, height: 50, padding: 25  }} />
    </AuthStyle>
  )
}