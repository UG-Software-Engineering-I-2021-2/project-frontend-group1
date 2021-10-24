import React from "react";
import { Button } from "@chakra-ui/button";
import { useHistory } from "react-router";

export const LogOut = () => {
  const history = useHistory()

  const logOut = () => {
    localStorage.clear()
    history.push("/")
  }

  return (
    <>
      <Button background="black" textColor="white" mt={5} mr={5} onClick={logOut}>
        Logout
      </Button>
    </>
  );
};
