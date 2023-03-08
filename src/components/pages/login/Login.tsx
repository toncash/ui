import { ImageAvatar } from "@twa-dev/mark42"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react"
import classes from "./Login.module.css"
import { useTonConnect } from "../../../hooks/useTonConnect"
import { Navigate } from "react-router-dom"
import { PATH_PROFILE } from "../../../config/routes-config"
import User from "../../../models/user"

export const LoginStyle = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

export const Login = () => {
  const win: any = window
  const tg = win?.Telegram.WebApp
  console.log(tg)
  console.log(tg?.initDataUnsafe)

  const { connected, isLoading } = useTonConnect()

  const [user, setUser] = useState<User>()

  const token = import.meta.env.VITE_BOT_ACCESS_TOKEN
  console.log(import.meta.env)

  const handleGetUser = async () => {
    const userId = tg.initDataUnsafe?.user?.id
    const username = tg.initDataUnsafe?.user?.username

    const token = "5753455287:AAE2mw1LOzF1w5_scFR9kb53m4KM9L00wd8"
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${token}/getUserProfilePhotos?user_id=${userId}&limit=1`
      )
      const data = await response.json()
      const photo = data.result.photos[0]
      const fileId = photo[photo.length - 1].file_id
      const response2 = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`)
      const data2 = await response2.json()
      const avatarUrl = `https://api.telegram.org/file/bot${token}/${data2.result.file_path}`

      setUser({
        id: userId,
        name: username,
        avatar: avatarUrl,
      })
    } catch (error) {
      console.log("Error:", error)
    }
  }

  useEffect(() => {
    if (tg.initDataUnsafe?.user?.id) {
      handleGetUser()
    } else {
      setUser({
        id: 1,
        name: "svetender",
        avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png",
      })
    }
  }, [tg.initDataUnsafe?.user?.id])

  if (connected) {
    console.log("+")
    return <Navigate to={PATH_PROFILE} />
  }

  return (
    <div className={classes.pageLogin}>
      <ImageAvatar
        src={user?.avatar ? user.avatar : "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png"}
        size={114}
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
    </div>
  )
}
