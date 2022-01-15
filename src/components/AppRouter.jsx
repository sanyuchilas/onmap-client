import React from "react";
import {Routes, Route, Navigate} from "react-router-dom"
import { authRoutes, publicRoutes } from "router/routes";
import { MAIN_ROUTE } from "utils/constants";

const AppRouter = () => {
  let isAuth = true
  return (
    <Routes>
      {publicRoutes.map(({path, component}) => 
        <Route key={path} path={path} element={component}/>
      )}
      {isAuth && authRoutes.map(({path, component}) => 
        <Route key={path} path={path} element={component}/>
      )}
      <Route path='*' element={<Navigate replace to={MAIN_ROUTE}/>}/>
    </Routes>
  );
};

export default AppRouter;