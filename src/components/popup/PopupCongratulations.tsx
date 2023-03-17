import classes from "./popupStyle.module.css"
import iconCongratulations from "../../../public/iconCongratulations.svg"
import { useState } from "react"

type PropsType = {
  flag: boolean
  hidePopup: () => void
}

const PopupCongratulations = (props: PropsType) => {
  const { flag, hidePopup } = props

  return flag ? (
    <div className={classes.popup}>
      <div className={classes.popupContent}>
        <img src={iconCongratulations} className={classes.popupIcon} />
        <p className={classes.popupTitle}>Congratulations!</p>
        <p className={classes.popupSubtitle}>all went well!</p>
        <button className={classes.buttonСontinue} onClick={hidePopup}>
          Сontinue
        </button>
      </div>
    </div>
  ) : (
    <div></div>
  )
}

export default PopupCongratulations
