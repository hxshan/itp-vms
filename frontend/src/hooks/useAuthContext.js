import { AuthContext,useDebugValue } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const auth = useContext(AuthContext)

    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")


    return useContext(auth)
}