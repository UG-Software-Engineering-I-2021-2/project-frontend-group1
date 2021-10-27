import React, {useEffect} from "react";
import { useHistory } from "react-router";


export const NotFoundUser = () => {
    const history = useHistory()
    
    useEffect(() => {
        setTimeout(()=>{
            localStorage.clear()
            history.push("/")
        }, 1000)
    }, [])

    return (<> User not found </>)
}