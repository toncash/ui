import { ImageAvatar } from "@twa-dev/mark42"
import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PATH_CREATEORDER, PATH_FINDORDERS, PATH_LOGIN, PATH_HISTORY } from "../../../config/routes-config"
import { useTonConnect } from "../../../hooks/useTonConnect"
import classes from "./Profile.module.css"
import { useTonClient } from "../../../hooks/useTonClient"
import { getEmptyUser } from "../../../models/user"
import { useStore } from "@nanostores/react"
import { setUser, userData } from "../../../store/UserData"
import getAvatar from "../../../utils/getAvatar"
import { Link } from "react-router-dom"
import OrderListViewSmall from "../../orderListViewSmall/OrderListViewSmall";
import {dealsService, ordersUserService} from "../../../config/service-config";
import {OrderUser} from "../../../models/order-user";
import {Address, fromNano, toNano} from "ton";
import {Deal} from "../../../models/deal";
import DealListViewSmall from "../../dealListViewSmall/DealListViewSmall";
import {Button} from "@mui/material";
import {useAccount} from "../../../hooks/useAccount";
import {useCounterContract} from "../../../hooks/useCounterContract";
import {useDealContract} from "../../../hooks/useDealContract";
import {useMaster} from "../../../hooks/useMaster";
import {DealUser} from "../../../models/deal-user";
import Order from "../../../models/order";


export const ButtonOrder = styled.button`
  background-color: ${props => (props.disabled ? "#6e6e6e" : "var(--tg-theme-button-color)")};
  border: 0;
  border-radius: 8px;
  padding: 10px 20px;
  color: var(--tg-theme-button-text-color);
  font-weight: 700;
  cursor: pointer;
  pointer-events: ${props => (props.disabled ? "none" : "inherit")};
  min-width: 150px;
  width: 49%;
  height: 50px;
  font-size: 20px;
`

export const FlexBoxRow1 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3%;
  align-items: center;
`

export const UserName = styled.div`
  margin: 0 auto;
  padding: 10px 20px;
  color: black;
  font-weight: 700;
`

export const Indicators = styled.div`
  margin: 0 auto;
  color: black;
  font-weight: 700;
`

export const Profile = () => {
  const win: any = window
  const tg = win?.Telegram.WebApp

  const navigate = useNavigate()

  const { connected, wallet, sender } = useTonConnect()
  const client = useTonClient()
  const [balance, setBalance] = useState(0)
  const [currentOrders, setCurrentOrders] = useState<Order []>([])
  const [currentDeals, setCurrentDeals] = useState<DealUser []>([])
  const user = useStore(userData)
  let accountContract
  let dealContract = useDealContract(Address.parse("0:a9b8202f715bb610544138ff97f0f7793a00cc4a4173ae807593184b03639ce1"))
  let masterContract
  useEffect(() => {
    if (!!client.client && !connected) {
      navigate(PATH_LOGIN)
    }


    // masterContract = useMaster()

    client.client?.getBalance(Address.parse(wallet as string))
        .then(res=>setBalance(Number(fromNano(res))))
    ordersUserService.getOrderUsersByUser(user.chatId)// TODO собрать сделки которые мне прислали
        .then(res=>setCurrentOrders(res))
        .catch(e=>console.log(e))
    //
    dealsService.getDealsByUser(user.chatId)
        .then(res=>setCurrentDeals(res))
        .catch(err=>console.log(err))

  }, [])


  // console.log(user)
  // TODO convert deal to order
  const getOrders = () => {
    return currentOrders.map((item, index) => {
      return <OrderListViewSmall order={item} key={index}></OrderListViewSmall>
    })
  }

  const getDeals = () => {
    return currentDeals.map((item, index) => {
      return <DealListViewSmall dealUser={item} key={index}></DealListViewSmall>
    })
  }



  const handleGetUser = async () => {
    const userId = tg.initDataUnsafe?.user?.id
    const username = tg.initDataUnsafe?.user?.username

    try {
      const avatarUrl = await getAvatar(userId)
      setUser({
        chatId: userId,
        username: username,
        avatarURL: avatarUrl,
        wallet,
      })
    } catch (error) {
      console.log("Error:", error)
    }
  }

  useEffect(() => {
    if (tg.initDataUnsafe?.user?.id) {
      if (!user.chatId) {
        handleGetUser()
      }
    } else {
      setUser(getEmptyUser())
    }
  }, [tg.initDataUnsafe?.user?.id])

  const [viewOnlyFilter, setViewOnlyFilter] = useState<"buy" | "sell">("sell")

  // TODO  вывести сделки

  //  - подставить правильный запрос апи

  // async function getData() {
  //     const data = await ordersService.getDealsByUser(Number(user.id))
  //     setAllOrders(data)
  //   }

  //   const [arrayDeals, setArrayDeals] = useState<Order[]>([])

  //   useEffect(() => {
  //     getData()
  //   }, [])

  // - fake data удалить

  const arrayDeals = [
    {
      src: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png",
      id: 32,
      buyerId: "katya_ulyanova ",
      amount: "10 000",
      status: "Сompleted",
      data: "23.01.2023",
      location: "al. Tadeusza Kościuszki 49/51, 90-514 Łódź, Poland",
      x: 55.7478993,
      y: 37.673359,
    },
    {
      src: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png",
      id: 32,
      buyerId: "katya_ulyanova ",
      amount: "10 000",
      status: "Сompleted",
      data: "23.01.2023",
      location: "al. Tadeusza Kościuszki 49/51, 90-514 Łódź, Poland",
      x: 55.7478993,
      y: 37.673359,
    },
    {
      src: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png",
      id: 32,
      buyerId: "katya_ulyanova ",
      amount: "10 000",
      status: "Сompleted",
      data: "23.01.2023",
      location: "al. Tadeusza Kościuszki 49/51, 90-514 Łódź, Poland",
      x: 55.7478993,
      y: 37.673359,
    },
  ]

  // for filter button

  const handleClickSwitchOnlyBitton = () => {
    if (viewOnlyFilter === "buy") {
      setViewOnlyFilter("sell")
    } else {
      setViewOnlyFilter("buy")
    }
  }

  const styleActiveOnlyBitton = { zIndex: "1", backgroundColor: "#26272B" }

  const styleDisabledOnlyButton = { color: "#9B9B9B", backgroundColor: "rgba(255, 255, 255, 0.05)" }

  return (
    <div className={classes.profile}>
      <ImageAvatar
        src={user?.avatarURL}
        size={114}
        style={{
          marginTop: 50,
        }}
      />
      <p className={classes.userName}>@{user?.username}</p>

      <div className={classes.userInfo}>
        <div className={classes.userInfo__item}>
          <p className={classes.userInfo__itemTitle}>Balance:</p>
          <p className={classes.userInfo__itemValue}>{balance}</p>
        </div>

        <div className={classes.userInfo__item}>
          <p className={classes.userInfo__itemTitle}>Comunity:</p>
          <span className={classes.userInfo__itemValue}>1</span>
        </div>
      </div>

      <div className={classes.buttonContainer}>
        <button
          className={classes.buttonOrder}
          type="button"
          onClick={() => {
            navigate(PATH_CREATEORDER)
          }}
        >
          Make order
        </button>
        <button
          className={classes.buttonOrder}
          type="button"
          onClick={() => {
            navigate(PATH_FINDORDERS)
          }}
        >
          Find order
        </button>
      </div>

      <div className={classes.sectionOrder}>
        <div className={classes.sectionOrderHeader}>
          <h2 className={classes.sectionOrderTitle}>Current Orders</h2>
          <Link className={classes.historyLink} to={PATH_HISTORY}>
            History
          </Link>
        </div>

        <div className={classes.onlyButtonContainer}>
          <button
            onClick={handleClickSwitchOnlyBitton}
            className={classes.onlyButton}
            style={viewOnlyFilter === "sell" ? styleActiveOnlyBitton : styleDisabledOnlyButton}
          >
            Only sell
          </button>
          <button
            onClick={handleClickSwitchOnlyBitton}
            className={classes.onlyButton}
            style={viewOnlyFilter === "buy" ? styleActiveOnlyBitton : styleDisabledOnlyButton}
          >
            Only buy
          </button>
        </div>
        <div className={classes.viewListOrdersContainer}>{getDeals()}</div>
        <div className={classes.viewListOrdersContainer}>{getOrders()}</div>
      </div>
      <Button onClick={()=>{
        // dealsService.acceptDeal(
        //     "6410566b384724250566c838",
        //     "640f29a0d4dfb1303244f9bc",
        //     "260316435",
        //     sender.address as Address,
        //     Address.parse("0:a9b8202f715bb610544138ff97f0f7793a00cc4a4173ae807593184b03639ce1"),
        //     accountContract)
        // masterContract.sendNewAccount(Address.parse("0:a9b8202f715bb610544138ff97f0f7793a00cc4a4173ae807593184b03639ce1"), toNano(1))
        // // accountContract.getDealAddress(Address.parse("0:a9b8202f715bb610544138ff97f0f7793a00cc4a4173ae807593184b03639ce1"))
        // // console.log("dealContract")


      }}>create contract</Button>
    </div>
  )
}
