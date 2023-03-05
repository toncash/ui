import { ImageAvatar } from "@twa-dev/mark42"
import React from "react"
import styled from "styled-components"
import { CenterImg, UserName } from "./Profile"
import { TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react"

export const LoginStyle = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

export const Login = () => {
  return (
    <LoginStyle>
      <CenterImg>
        <ImageAvatar
          src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png"
          size={150}
          style={{
            marginTop: 50,
          }}
        />
      </CenterImg>
      <UserName>@userName</UserName>
    </LoginStyle>
  )
}
