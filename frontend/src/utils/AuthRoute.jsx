import { useAuthContext } from '@/hooks/useAuthContext'
import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'

const AuthRoute = ({element,permission, path,fallbackUrl}) => {
    let isAuthorized = false;
    const {user} = useAuthContext()

    if(user?.accessToken == null){
       isAuthorized=false
    }
    try{
        if(user.permissions[permission].Create == false)
            isAuthorized=true
    }catch(error){
        isAuthorized=false
    }
    return(
        <Route path={path} element={isAuthorized? <element/>:<Navigate to={fallbackUrl}/>}/>
    )
}

export default AuthRoute