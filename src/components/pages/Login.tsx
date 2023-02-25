import { ImageAvatar } from '@twa-dev/mark42';
import React from 'react';
import styled from 'styled-components';
import { CenterImg, UserName } from './Profile';


export const LoginStyle = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;


export const Login = () => {

  return (
      <LoginStyle>
              <CenterImg>
                  <ImageAvatar src='https://api.telegram.org/file/bot6274692659:AAE8iBiGQdXJczgmig85FBbTzxwwZ1k3rhY/photos/file_0.jpg' size={300} style={{
                      marginTop: 50
                  }} />
              </CenterImg>
              <UserName>@userName</UserName>
          </LoginStyle>

  )
}