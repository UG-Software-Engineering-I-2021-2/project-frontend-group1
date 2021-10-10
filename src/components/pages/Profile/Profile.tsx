import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginApp } from "../../../api/ApiEndpoints";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    
    if(!user?.email || `${user.email}`.length === 0) return

    LoginApp(user.email).then((val) => {
      console.log(val)
    }).catch((err) => {
      console.log(err)
    })
    
  }, [user])


  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated ? (
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    ) : <div></div>
  );
};

