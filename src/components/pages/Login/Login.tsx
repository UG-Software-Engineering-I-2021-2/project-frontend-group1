
import React,{useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Login = () => {
  const { loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    loginWithRedirect({redirectUri: window.location.origin + "/main", fragment: user?.email}).then((val) => {
      console.log(val, user)
    }).catch((err)=>{
      console.log(err)
    })


  }, [])
  return <></>;
};
