import { TonConnectButton } from "@tonconnect/ui-react"
import styled from "styled-components"
import { Button, FlexBoxCol, FlexBoxRow } from "../styled/styled"
import { useTonConnect } from "../../hooks/useTonConnect"
import { CHAIN } from "@tonconnect/protocol"
import "@twa-dev/sdk"
import { Login } from "./login/Login"
import { Profile } from "./profile/Profile"
import { Routes } from "react-router-dom"

export const StyledApp = styled.div`
  background-color: #101113;
  color: #fff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

export const Pages = () => {
  const { network } = useTonConnect()

  return (
    <Routes>
      <StyledApp>
        <Profile />
      </StyledApp>
    </Routes>
  )
}
