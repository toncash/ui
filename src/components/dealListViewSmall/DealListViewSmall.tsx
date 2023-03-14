import { ImageAvatar } from "@twa-dev/mark42"
import { Link } from "react-router-dom"
import {BASE_PATH_CURRENTDEAL, BASE_PATH_CURRENTORDER} from "../../config/routes-config"
import classes from "./DealListViewSmall.module.css"
import {useEffect, useState} from "react";
import getAvatar from "../../utils/getAvatar";
import {useStore} from "@nanostores/react";
import {userData} from "../../store/UserData";
import {DealUser} from "../../models/deal-user";

export const DealListViewSmall = ({ dealUser }: { dealUser: DealUser }) => {
    const {deal, person} = dealUser
    const link = BASE_PATH_CURRENTDEAL + deal.id
    const user = useStore(userData)
    const [avatarUrl, setAvatarUrl] = useState("")
    useEffect(()=>{
        if(user.id===person.id){
            setAvatarUrl("/my_order.png")
        } else {
            getAvatar(Number(person.id))
                .then(res=>setAvatarUrl(res))
        }
    }, [])
  return (
    <Link className={classes.dealItem} to={link}>
      <div className={classes.userContainer}>
        <ImageAvatar src={avatarUrl} size={36} />
        <div>
          <p className={classes.userName}>{ user.id != person.id ? `@${person.username}` : "my order"}</p>
          {/*<p className={classes.dealData}>{deal.localDateTime?.substring(0, 10)}</p>*/}
        </div>
      </div>
      <div className={classes.info}>
        <p className={classes.infoValueTon}>{deal.amount} TON</p>

        {/* нужно будет дописать логику выбора */}
        <p className={classes.statusComleted}>{deal.dealStatus}</p>
        {/* <p className={classes.statusСancelled}>{order.status}</p> */}
      </div>
    </Link>
  )
}

export default DealListViewSmall
