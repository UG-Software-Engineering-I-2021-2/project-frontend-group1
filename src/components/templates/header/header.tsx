import React, { useEffect, useState } from "react";
import { Box, Grid, Text, GridItem } from "@chakra-ui/react";
import { LogOut } from "../../pages/LogOut/LogOut";


export const Header = () => {
  const [name, setName] = useState(localStorage.getItem("name"))
  const [role, setRole] = useState(localStorage.getItem("role"))

  return (
    <Grid templateColumns="repeat(10, 1fr)" gap={6} h="200">

      <GridItem colSpan={2}>
        <Box w="100%" h="200" >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Utec-logo.jpg"
            style={{ marginBottom: "20px" }}
            width="150"
            height="200"></img>
        </Box>
      </GridItem>

      <GridItem colStart={3} colEnd={6} >
        <Box w="100%" h="200"  style={{ display: "flex", alignItems: "center" }}>
          <Text fontSize="lg">
            <b> Bienvenido {role} </b>   
            <br/> 
            {name}
          </Text>
        </Box>
      </GridItem>

      <GridItem colSpan={1} colStart={10}>
        <Box w="100%" h="200" style={{ display: "flex", justifyContent: "end" }} >
          <LogOut />
        </Box>
      </GridItem>

    </Grid >

  )
}
