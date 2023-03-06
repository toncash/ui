import { ImageAvatar } from "@twa-dev/mark42"
import React from "react"
import styled from "styled-components"
import { CenterImg, UserName } from "../Profile"
import { TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react"
import { autocompleteClasses } from "@mui/material"
import classes from "./Login.module.css"
import User from "../../../models/user"
import { useTonConnect } from "../../../hooks/useTonConnect"
import { Navigate } from "react-router-dom"
import { PATH_LOGIN, PATH_PROFILE } from "../../../config/routes-config"

export const LoginStyle = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

export const Login = () => {
  const win: any = window
  const tg = win?.Telegram.WebApp
  console.log(tg)
  console.log(tg?.initDataUnsafe)
  console.log(tg.initDataUnsafe?.user?.id)

  const user = {
    id: 1,
    name: "svetender",
    avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png",
  }

  const { connected, isLoading } = useTonConnect()

  if (connected) {
    return <Navigate to={PATH_PROFILE} replace={true} />
  }

  return (
    <LoginStyle>
      <ImageAvatar
        src={user?.avatar ? user.avatar : "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png"}
        size={150}
        style={{
          marginTop: 50,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <p className={classes.userName}>@{user?.name ? user.name : "username"}</p>
      <h1 className={classes.titlePage}>Welcome</h1>
      <p className={classes.subtitlePage}>Сonnect your wallet for further registration</p>
      <TonConnectButton className={classes.connectButton} />
    </LoginStyle>
  )
}
