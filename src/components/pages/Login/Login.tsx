
import React,{useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect({redirectUri: window.location.origin + "/main"}).then((val) => {
      console.log(val)
    }).catch((err)=>{
      console.log(err)
    })


  }, [])
  return <></>;
};
