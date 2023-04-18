import { PATH_LOGIN, routes } from "./config/routes-config"
import { StyledApp } from "./components/pages/Pages"
import "./App.css"
import { Login } from "./components/pages/login/Login"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import React, { ReactNode, useEffect, useState } from "react"

import { useTonConnect } from "./hooks/useTonConnect"
import "@twa-dev/sdk"
import { TonConnectButton } from "@tonconnect/ui-react"
import { default as classesLogin } from "./components/pages/login/Login.module.css"
import { default as classesProfile } from "./components/pages/profile/Profile.module.css"
import Cancel from "./components/pages/currentOrder/CurrentOrder"
import { Location } from "./models/order"
import { locationData, setErrorLocationData, setLocationData } from "./store/Location"
import { useStore } from "@nanostores/react"

const App = () => {
  const { connected } = useTonConnect()

  function getRoutes(): ReactNode[] {
    return routes.map(r => {
      return <Route key={r.path} path={r.path} element={r.element}></Route>
    })
  }

  const location = useStore(locationData)
  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorLocationData("missing")
      return
    }
    try {
      navigator.geolocation.getCurrentPosition(
        geo => {
          setLocationData({ x: geo.coords.latitude, y: geo.coords.longitude })
        },
        () => setErrorLocationData("error")
      )
    } catch (ex) {
      setErrorLocationData("catch")
    }
  }, [])

  return (
    <StyledApp>
      {/* Location: {JSON.stringify(location)} */}
      <BrowserRouter>
        <Routes>
          {getRoutes()}
          <Route key={PATH_LOGIN} path={PATH_LOGIN} element={<Login />} />
          <Route path="/*" element={<Navigate to={PATH_LOGIN} replace />} />
        </Routes>
      </BrowserRouter>
      <TonConnectButton className={!connected ? classesLogin.connectButton : classesProfile.tonButton} />
    </StyledApp>
  )
}

export default App
