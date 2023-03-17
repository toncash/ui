import { ImageAvatar } from "@twa-dev/mark42"
import { Link } from "react-router-dom"
import { BASE_PATH_DEAL } from "../../config/routes-config"
import classes from "./DealListViewSmall.module.css"
import { DealUser } from "../../models/deal-user"
import { useEffect, useState } from "react"
import getAvatar from "../../utils/getAvatar"

type PropsType = {
  dealUser: DealUser
}

export const DealListViewSmall = (props: PropsType) => {
  const { dealUser } = props
  const { deal, person } = dealUser
  const link = BASE_PATH_DEAL + deal.id
  const [avatarUrl, setAvatarUrl] = useState("")

  useEffect(() => {
    getAvatar(Number(person.chatId)).then(res => setAvatarUrl(res))
  }, [])
  return (
    <Link className={classes.orderItem} to={link}>
      <div className={classes.userContainer}>
        <ImageAvatar src={avatarUrl} size={36} />
        <div>
          <p className={classes.userName}>@{person.username}</p>
        </div>
      </div>
      <div className={classes.info}>
        <p className={classes.infoValueTon}>{deal.amount} TON</p>
      </div>
    </Link>
  )
}

export default DealListViewSmall
