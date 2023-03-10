import classes from "./ButtonBack.module.css"
import iconBack from "../../../public/iconBack.svg"
import { useNavigate } from "react-router-dom"

const ButtonBack = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <button className={classes.backButton} onClick={goBack}>
      <img src={iconBack} alt="iconBack" />
    </button>
  )
}

export default ButtonBack
