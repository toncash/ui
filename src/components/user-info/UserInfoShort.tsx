import classes from "./UserInfoShort.module.css"
import { ImageAvatar } from "@twa-dev/mark42"
import React, { useEffect, useState } from "react"
import User from "../../models/user"
import getAvatar from "../../utils/getAvatar"
import Order from "../../models/order"
import { useStore } from "@nanostores/react"
import { locationData } from "../../store/Location"
import { TextField } from "@mui/material"

const UserInfoShort = (props: { user: User; order: Order }) => {
  const { user, order } = props
  const [avatarUrl, setAvatarUrl] = useState("")
  const location = useStore(locationData)
  useEffect(() => {
    getAvatar(Number(user.chatId)).then(res => setAvatarUrl(res))
  }, [])
  return (
    <div className={classes.userContainer}>
      <ImageAvatar src={avatarUrl} size={57} />
      <div>
        <p className={classes.userName}>@{user.username}</p>
        {/* TODO вывести дистанцию и рейтинг */}
      </div>
    </div>
  )
}

export default UserInfoShort
