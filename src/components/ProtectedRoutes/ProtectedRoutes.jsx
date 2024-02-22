import React from 'react'
import Cookies from 'js-cookie'
import { Outlet,useNavigate,Navigate } from 'react-router-dom'
const ProtectedRoutes = ({allowedRoles}) => {
  console.log(allowedRoles,"roles");
    const token=Cookies.get("access_token")
    const role=Cookies.get("role")
    console.log(token);
    return token !== undefined ? (
        role === allowedRoles ? (
          <Outlet />
        ) : (
          <Navigate to="/pagenotfound" />
        )
      ) : (
        <Navigate to="/" />
      );
}

export default ProtectedRoutes