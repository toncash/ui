import {
  PATH_LOGIN,
  PATH_PROFILE,
  PATH_CREATEORDER,
  PATH_FINDORDER,
  PATH_FINDORDERS,
  routes,
} from "./config/routes-config"
import { Pages, StyledApp } from "./components/pages/Pages"
import "./App.css"
import { Login } from "./components/pages/login/Login"
import { Profile } from "./components/pages/Profile"
import { CreateOrder } from "./components/pages/CreateOrder"
import { FindOrder } from "./components/pages/FindOrder"
import FindOrders from "./components/pages/FindOrders"
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom"
import React, { ReactNode, useEffect, useState } from "react"
import { redirect } from "react-router-dom"

import { useTonConnect } from "./hooks/useTonConnect"
import "@twa-dev/sdk"
import { TonConnectButton } from "@tonconnect/ui-react"

const App = () => {
  function RequireAuth({ children }: { children: JSX.Element }) {
    const { connected, isLoading } = useTonConnect()

    if (isLoading) return null

    if (!connected) {
      return <Navigate to={PATH_LOGIN} replace />
    }

    return children
  }

  function getRoutes(): ReactNode[] {
    return routes.map(r => {
      return <Route key={r.path} path={r.path} element={r.element}></Route>
    })
  }

  return (
    <StyledApp>
      <BrowserRouter>
        <Routes>
          {/* <Route key={PATH_PROFILE} path={PATH_PROFILE} element={<Profile />}/>
            <Route key={PATH_CREATEORDER} path={PATH_CREATEORDER} element={<CreateOrder />}/>
            <Route key={PATH_FINDORDER} path={PATH_FINDORDER} element={<FindOrder />}/>
            <Route key={PATH_FINDORDERS} path={PATH_FINDORDERS} element={<FindOrders />}/> */}
          {getRoutes()}
          <Route key={PATH_LOGIN} path={PATH_LOGIN} element={<Login />} />
          <Route path="/*" element={<Navigate to={PATH_LOGIN} replace />} />
        </Routes>
      </BrowserRouter>
    </StyledApp>
  )
}

export default App
