import React, { useEffect, useState } from "react"
import classes from "./History.module.css"
import ButtonBack from "../../buttonBack/ButtonBack"
import { dealsService } from "../../../config/service-config"
import { useStore } from "@nanostores/react"
import { userData } from "../../../store/UserData"
import DealListViewSmall from "../../dealListViewSmall/DealListViewSmall"
import { DealUser } from "../../../models/deal-user"

const History = () => {
  const user = useStore(userData)
  const [dealsUserArray, setDealsUser] = useState<DealUser[]>([])
  async function getData() {
    const data = await dealsService.getDealsByUser(user.chatId)
    setDealsUser(data)
  }

  useEffect(() => {
    getData()
  }, [])

  const [viewOnlyFilter, setViewOnlyFilter] = useState<"buy" | "sell">("sell")

  const handleClickSwitchOnlyBitton = () => {
    if (viewOnlyFilter === "buy") {
      setViewOnlyFilter("sell")
    } else {
      setViewOnlyFilter("buy")
    }
  }

  const styleActiveOnlyBitton = { zIndex: "1", backgroundColor: "#26272B" }

  const styleDisabledOnlyButton = { color: "#9B9B9B", backgroundColor: "rgba(255, 255, 255, 0.05)" }

  const getArray = () => {
    return dealsUserArray.map((item, index) => {
      return <DealListViewSmall dealUser={item} key={index} />
    })
  }

  return (
    <section className={classes.history}>
      <div className={classes.historyHeaders}>
        <ButtonBack />
        <h1 className={classes.historyTitle}>History</h1>
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
      <input className={classes.searchInput} placeholder="Search"></input>
      <div className={classes.viewListOrdersContainer}>{getArray()}</div>
    </section>
  )
}

export default History
