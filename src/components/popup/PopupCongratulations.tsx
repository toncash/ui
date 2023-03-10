import classes from "./popupStyle.module.css"
import iconCongratulations from "../../../public/iconCongratulations.svg"
import { useState } from "react"

const PopupCongratulations = () => {
  //   const [open, setOpen] = useState<boolean>(true)

  //   const openPopupCongratulations = () => setOpen(true)
  //   const closePopupCongratulations = () => setOpen(false)

  return (
    <div className={classes.popup}>
      <div className={classes.popupContent}>
        <img src={iconCongratulations} className={classes.popupIcon} />
        <p className={classes.popupTitle}>Congratulations!</p>
        <p className={classes.popupSubtitle}>all went well!</p>
        <button className={classes.buttonСontinue}>Сontinue</button>
      </div>
    </div>
  )
}

export default PopupCongratulations
