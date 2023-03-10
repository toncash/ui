import classes from "./Cancel.module.css"
import ButtonBack from "../../buttonBack/ButtonBack"
import PopupCongratulations from "../../popup/PopupCongratulations"
import PopupUnfortunately from "../../popup/PopupUnfortunately"

const Cancel = () => {
  return (
    <section className={classes.cancelPage}>
      <div className={classes.cancelHeaders}>
        <ButtonBack />
        <h1 className={classes.cancelTitle}>Cancel</h1>
      </div>
      <p className={classes.cancelSubtitle}>State the reason for cancellation:</p>
      <form className={classes.cancelForm}>
        <label className={classes.labelCheckbox}>
          <input type="checkbox" className={classes.checkbox} />
          Сhanged my mind
        </label>
        <label className={classes.labelCheckbox}>
          <input type="checkbox" className={classes.checkbox} />
          The buyer did not come
        </label>
        <label className={classes.labelCheckbox}>
          <input type="checkbox" className={classes.checkbox} />
          Other
        </label>
        <textarea className={classes.textarea} placeholder="Enter text" />
      </form>
      <div className={classes.buttonContainer}>
        <button className={classes.buttonValueCancel}>Cancel</button>
        <button className={classes.buttonValueCame}>I came</button>
      </div>

      {/* проверка попапов

      <PopupCongratulations />
      <PopupUnfortunately /> */}
    </section>
  )
}

export default Cancel
