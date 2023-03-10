import classes from "./popupStyle.module.css"
import iconUnfortunately from "../../../public/iconUnfortunately.svg"

const PopupUnfortunately = () => {
  return (
    <div className={classes.popup}>
      <div className={classes.popupContent}>
        <img src={iconUnfortunately} className={classes.popupIcon} />
        <p className={classes.popupTitle}>Unfortunately!</p>
        <p className={classes.popupSubtitle}>the order was cancelled</p>
        <button className={classes.buttonСlose}>Сontinue</button>
      </div>
    </div>
  )
}

export default PopupUnfortunately
