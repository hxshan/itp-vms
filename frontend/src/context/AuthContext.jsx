
import { createContext,useEffect,useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const AuthContext = createContext()

export const authReducer = (state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return {user:action.payload,loading:false}
        case 'LOGOUT':
            return {user:null,loading:false}
        default:
            state
    }
}


export const AuthContextProvider =({ children })=>{
const [state,dispatch] = useReducer(authReducer,{
    user:null,
    loading:true
})

const isTokenExpired = (token)=>{
    if(token != null){
        const decoded=jwtDecode(token)
        const currentTime = Date.now() /1000
        return decoded.exp < currentTime;
    }
}


const navigate = useNavigate()
const [loading, setLoading] = useState(true);

useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    const token=user?.accessToken || null

    if (user && !isTokenExpired(token)) {
        dispatch({ type: 'LOGIN', payload: user }) 
    }else{
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})
        navigate('/login', { replace: true });
    }
    setLoading(false)
},[])

    console.log('AuthContext',state)

    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
