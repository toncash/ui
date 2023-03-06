import { ImageAvatar } from "@twa-dev/mark42"
import styled from "styled-components"
import { Button, FlexBoxCol, FlexBoxRow } from "../../styled/styled"
import { LoginStyle } from "../login/Login"
import { MapComponent } from "../../map/MapComponent"
import { TonConnectButton } from "@tonconnect/ui-react"
import React, { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { PATH_CREATEORDER, PATH_FINDORDERS, PATH_LOGIN } from "../../../config/routes-config"
import { useTonConnect } from "../../../hooks/useTonConnect"
import classes from "./Profile.module.css"
import {useTonClient} from "../../hooks/useTonClient";

// type AuthType = {

// }

// : React.FC<AuthType>

// const AuthStyle = styled.div`
//   max-width: 1400px;
//   margin: 0 auto;
// `;

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
  const navigate = useNavigate()

  const { connected } = useTonConnect()
  const client = useTonClient()

  useEffect(() => {
    if (!!client.client && !connected) {
      navigate(PATH_LOGIN)
    }
  }, [connected, client])

  const user = {
    id: 1,
    name: "svetender",
    avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png",
  }

  return (
    <LoginStyle>
      <TonConnectButton className={classes.tonButton} />
      <div className={classes.profile}>
        <ImageAvatar
          src={user.avatar}
          size={114}
          style={{
            marginTop: 50,
          }}
        />
        <p className={classes.userName}>@{user.name}</p>

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
      </div>
    </LoginStyle>
  )
}
