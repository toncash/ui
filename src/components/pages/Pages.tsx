import React from 'react'
import {BrowserRouter, Route, Navigate} from 'react-router-dom'
import { Auth } from './Auth'
// import Error404 from './pages/Error404'

export const PATH = {
    AUTH: '/auth',
    EXCHANGE: 'exchange'
}

export function Pages() {
    return (
        <div>
            <BrowserRouter>
            <Route path='/' element={<Navigate to={'/auth'} />} />
            <Route path='/auth' element={<Auth />} />

            </BrowserRouter>

        </div>
    )
}

export default Pages