import React from "react";
import { Box } from "@chakra-ui/react";
import { LogOut } from "../../pages/LogOut/LogOut";


export const Header = () =>{
    return (
        <Box>
        <div style={{ display: "flex" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Utec-logo.jpg"
            style={{ marginBottom: "20px" }}
            width="150"
            height="200"
          ></img>
          <div
            style={{
              display: "flex",
              alignItems: "begin",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <LogOut />
          </div>
        </div>
      </Box>
    )
}