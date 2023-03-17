import { ImageAvatar } from "@twa-dev/mark42"
import React, { useEffect } from "react"
import styled from "styled-components"
import classes from "./Login.module.css"
import { useTonConnect } from "../../../hooks/useTonConnect"
import { Navigate } from "react-router-dom"
import { PATH_PROFILE } from "../../../config/routes-config"
import User, {getEmptyUser} from "../../../models/user"
import {setUser, userData} from "../../../store/UserData";
import {useStore} from "@nanostores/react";
import {usersService} from "../../../config/service-config";
import getAvatar from "../../../utils/getAvatar";

export const LoginStyle = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

export const Login = () => {
  const win: any = window
  const tg = win?.Telegram.WebApp
  console.log(tg)
  console.log(tg?.initDataUnsafe)

  const { connected, wallet } = useTonConnect()

  const user = useStore(userData)

  const handleGetUser = async () => {
    const userId = tg.initDataUnsafe?.user?.id
    const username = tg.initDataUnsafe?.user?.username
    try {
      const avatarUrl = await getAvatar(userId)
      setUser({
        chatId: userId,
        username,
        avatarURL: avatarUrl,
        wallet
      })

      const checkUser = await usersService.getUser(userId)

      if(!checkUser.chatId){
        const res = await usersService.addUser({
          chatId: userId,
          username,
          avatarURL: avatarUrl
        })

      }
    } catch (error) {
      console.log("Error:", error)
    }
  }

  useEffect(() => {

    if (tg.initDataUnsafe?.user?.id) {
      handleGetUser()

    } else {
      setUser(getEmptyUser())
    }
  }, [])

  if (connected) {
    console.log("+")
    return <Navigate to={PATH_PROFILE} />
  }

  return (
    <div className={classes.pageLogin}>
      <ImageAvatar
        src={user?.avatarURL ? user.avatarURL : "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png"}
        size={114}
        style={{
          marginTop: 50,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <p className={classes.userName}>@{user?.username ? user.username : "username"}</p>
      <h1 className={classes.titlePage}>Welcome</h1>
      <p className={classes.subtitlePage}>Сonnect your wallet for further registration</p>

    </div>
  )
}
