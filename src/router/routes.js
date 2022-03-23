import Main from "./../pages/Main"
import React from "react"
import { PLACEMARK_ROUTE, MAIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./../utils/constants"
import PlaceMark from "./../pages/PlaceMark"
import Auth from "./../pages/Auth"

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    component: <Main/>
  },
  {
    path: LOGIN_ROUTE,
    component: <Auth/>
  },
  {
    path: REGISTRATION_ROUTE,
    component: <Auth/>
  },
  {
    path: PLACEMARK_ROUTE + '/:id',
    component: <PlaceMark/>
  }
]

export const authRoutes = [
  
]