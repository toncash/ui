import classes from "./Deal.module.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ImageAvatar } from "@twa-dev/mark42"
import ButtonBack from "../../buttonBack/ButtonBack"
import { MapView } from "../../map/MapView"
import { dealsService, usersService } from "../../../config/service-config"
import getAvatar from "../../../utils/getAvatar"
import User, { getEmptyUser } from "../../../models/user"
import { OrderType } from "../../../models/order"
import { DealProps } from "./deal-props"
import { useMaster } from "../../../hooks/useMaster"
import { Address, toNano } from "ton"
import { useAccount } from "../../../hooks/useAccount"
import { useDealContract } from "../../../hooks/useDealContract"

const DealCurrent = (props: DealProps) => {
  const { deal, id, order, user, orderOwner } = props
  const [isDealOwner, setIsDealOwner] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState("")
  const [amountPay, setAmountPay] = useState("")
  const [amountReceive, setAmountReceive] = useState("")
  const [client, setClient] = useState<User>(getEmptyUser())

  // const masterContract = useMaster()
  // const accountContract = useAccount()
  // const dealContract = useDealContract(Address.parse(deal.addressBuyer ? deal.addressBuyer : ""))

  async function getData() {
    if (orderOwner.chatId == user.chatId) {
      setIsDealOwner(false)
      const clientId = user.chatId == deal.sellerId ? deal.buyerId : deal.sellerId
      const _client = await usersService.getUser(clientId)
      setClient(_client)
      setAvatarUrl(await getAvatar(clientId))
    } else {
      setIsDealOwner(true)
      setAvatarUrl(await getAvatar(orderOwner.chatId))
    }

    if (String(order.orderType) === OrderType[OrderType.SELL]) {
      setAmountReceive(`${deal.amount * order.price} ${order.currency}`)
      setAmountPay(`${deal.amount} TON`)
    }

    if (String(order.orderType) === OrderType[OrderType.BUY]) {
      setAmountReceive(`${deal.amount} TON`)
      setAmountPay(`${deal.amount * order.price} ${order.currency}`)
    }
  }

  useEffect(() => {
    getData()
    console.log(props)
  }, [deal, order])

  return (
    <section className={classes.orderPage}>
      <div className={classes.orderHeaders}>
        <ButtonBack />
        <h1 className={classes.orderTitle}>Deal</h1>
      </div>
      <div className={classes.orderItem}>
        <div className={classes.userContainer}>
          <ImageAvatar src={avatarUrl} size={57} />
          <div>
            <p className={classes.userName}>@{isDealOwner ? orderOwner.username : client.username}</p>
            {/* <p className={classes.statusComleted}>{order?.status}</p> */}
          </div>
        </div>
        {!isDealOwner ? (
          <Link className={classes.chatLink} to={`https://t.me/${client.username}`}>
            See Chat
          </Link>
        ) : (
          ""
        )}
      </div>

      <div className={classes.infoContainer}>
        <div className={classes.infoItem}>
          <p className={classes.infoItemTitle}>Price:</p>
          <p className={classes.infoItemValue}>
            {order.price} {order.currency}
          </p>
        </div>

        <div className={classes.infoItem}>
          <p className={classes.infoItemTitle}>I will to pay:</p>
          <p className={classes.infoItemValue}>{isDealOwner ? amountReceive : amountPay}</p>
        </div>

        <div className={classes.infoItem}>
          <p className={classes.infoItemTitle}>I will receive:</p>
          <p className={classes.infoItemValue}>{isDealOwner ? amountPay : amountReceive}</p>
        </div>
      </div>
      <MapView order={order} />
      {!isDealOwner ? (
        <div className={classes.buttonContainer}>
          <button
            className={classes.buttonValueCancel}
            onClick={() => (!!deal?.id ? dealsService.denyDeal(deal.id) : "")}
          >
            Deny
          </button>
          <button
            className={classes.buttonValueCame}
            // onClick={async () => {
            //   if (!deal.id) {
            //     return
            //   }
            //   await dealsService.acceptDeal(deal.id)
            //   if (!deal.addressBuyer) {
            //     return
            //   }
            //   if (!accountContract.isDeployed) {
            //     await masterContract.sendNewAccount(Address.parse(deal.addressBuyer), toNano(deal.amount))
            //   } else if (!dealContract.isDeployed || (await dealContract.balance()) == 0) {
            //     await accountContract.sendNewDeal(Address.parse(deal.addressBuyer), toNano(deal.amount))
            //   }
            // }}
          >
            Accept
          </button>
        </div>
      ) : (
        <div className={classes.buttonContainer}>
          <button className={classes.buttonValueCancel} onClick={() => dealsService.cancelDeal(deal.id as string)}>
            Cancel
          </button>
        </div>
      )}
    </section>
  )
}

export default DealCurrent
