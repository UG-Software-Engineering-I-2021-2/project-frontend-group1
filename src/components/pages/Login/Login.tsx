import React, { useEffect } from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { useHistory } from "react-router";
import { LoginApp } from "../../../api/ApiEndpoints";
import { LoginResponse } from "../../../interfaces/login";


export const Login = () => {
  const history = useHistory()


  const responseGoogle = (user: any) => {

    if (user) {
      const indexOf = user.profileObj.email.indexOf("@");
      if (indexOf && user.profileObj.email.substr(indexOf) !== "@utec.edu.pe") {
        history.push("/not-found");
      } else {
        localStorage.setItem("user", JSON.stringify(user));
      }
    }

    
    if (user.tokenId) {
      const token = user.tokenId;

      LoginApp(user.profileObj.email, token).then((loggedUser: LoginResponse) => {
          localStorage.setItem("roll", loggedUser.roll)
          localStorage.setItem("email", loggedUser.email)
          localStorage.setItem("name", loggedUser.name)
         history.push("/main")
      }).catch((err) => {
        history.push("/not-found")
      })
    }

  };

  return (
    <>
      <GoogleLogin
        clientId="854441781361-k1cg7207b002frst5mirrhfko7tbj602.apps.googleusercontent.com"
        // render={(renderProps) => (
        //   <CustomGoogleButton
        //     onClick={renderProps.onClick}
        //     disabled={renderProps.disabled}
        //   />
        // )}
        buttonText="Continue with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};
