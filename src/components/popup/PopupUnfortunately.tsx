import classes from "./popupStyle.module.css"
import iconUnfortunately from "../../../public/iconUnfortunately.svg"

type PropsType = {
    flag: boolean,
    hidePopup: ()=>void
}

const PopupUnfortunately = (props: PropsType) => {
    const {flag, hidePopup} = props
  return (
    flag?<div className={classes.popup}>
      <div className={classes.popupContent}>
        <img src={iconUnfortunately} className={classes.popupIcon} />
        <p className={classes.popupTitle}>Unfortunately!</p>
        <p className={classes.popupSubtitle}>the order was cancelled</p>
        <button className={classes.buttonСlose} onClick={hidePopup}>Сontinue</button>
      </div>
    </div>:<div></div>
  )
}

export default PopupUnfortunately
