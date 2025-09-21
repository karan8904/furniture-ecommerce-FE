import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'
import Cookies from 'js-cookie';

const authRoutes = ["login", "resgister", "forgot-password", "passsword-reset"];

export const ProtectedRoutes = ({children}) => {
    const token = Cookies.get("token")

    if (!token) return <Navigate to="/login" replace />;
    return children
}

export const AdminRoutes = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const user = useSelector((state) => state.user.getCurrentUser.user)
    const navigate = useNavigate()

    const token = Cookies.get("token")
    if(!token) return <Navigate to="/login" replace />;

    useEffect(() => {
        if(Object.keys(user).length && !user.isAdmin){
            navigate("/")
        }
        if(user?.isAdmin){
            setIsAdmin(true)
        }
    }, [user])

    if(isAdmin) return children
}

export const IfAlreadyLoggedIn = ({children}) => {
    const token = Cookies.get("token");
    if(token) return <Navigate to="/" replace />;
    return children
}