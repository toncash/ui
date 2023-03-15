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
import OrderListViewSmall from "../../orderListViewSmall/OrderListViewSmall"

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

  const { connected, wallet } = useTonConnect()
  const client = useTonClient()
  useEffect(() => {}, [])
  useEffect(() => {
    if (!!client.client && !connected) {
      navigate(PATH_LOGIN)
    }
  }, [connected, client])

  const user = useStore(userData)
  console.log(user)
  const token = import.meta.env.VITE_BOT_ACCESS_TOKEN

  const handleGetUser = async () => {
    const userId = tg.initDataUnsafe?.user?.id
    const username = tg.initDataUnsafe?.user?.username

    try {
      const avatarUrl = await getAvatar(userId)
      setUser({
        id: userId,
        username: username,
        avatar: avatarUrl,
        wallet,
      })
    } catch (error) {
      console.log("Error:", error)
    }
  }

  useEffect(() => {
    if (tg.initDataUnsafe?.user?.id) {
      if (!user.id) {
        handleGetUser()
      }
    } else {
      setUser(getEmptyUser())
    }
  }, [tg.initDataUnsafe?.user?.id])

  const [viewOnlyFilter, setViewOnlyFilter] = useState<"buy" | "sell">("sell")

  // TO DO  вывести сделки

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

  const getArrayDeals = () => {
    return arrayDeals.map((item, index) => {
      return <OrderListViewSmall order={item} key={index} deal={true}></OrderListViewSmall>
    })
  }

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
        src={user?.avatar}
        size={114}
        style={{
          marginTop: 50,
        }}
      />
      <p className={classes.userName}>@{user?.username}</p>

      <div className={classes.userInfo}>
        <div className={classes.userInfo__item}>
          <p className={classes.userInfo__itemTitle}>Balance:</p>
          <p className={classes.userInfo__itemValue}>10</p>
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
        <div className={classes.viewListOrdersContainer}>{getArrayDeals()}</div>
      </div>
    </div>
  )
}
