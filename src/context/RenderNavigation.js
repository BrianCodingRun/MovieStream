import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { nav } from './Navigation'

export const RenderNavigation = () => {
  return (
    <Routes>
        {
            nav.map((r, i) => {
                if(r.isAuth) {
                    if(sessionStorage.getItem('token')) {
                        return <Route key={i} path={r.path} element={r.element} />
                    }
                } else if (!r.isAuth) {
                    return <Route key={i} path={r.path} element={r.element} />
                }
                return false
            })
        }
    </Routes>
  )
}