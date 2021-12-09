import React, { useEffect, useState } from "react";
import { Box, Grid, Text, GridItem, Image } from "@chakra-ui/react";
import { LogOut } from "../../pages/LogOut/LogOut";


export const Header = () => {
  const [name, setName] = useState(localStorage.getItem("name"))
  const [role, setRole] = useState(localStorage.getItem("role"))

  return (
    <Grid templateColumns="repeat(10, 1fr)" gap={6} h="100">

      <GridItem colSpan={2}>
        <Box w="100%" h="50" >
          <Image
            src="https://www.utec.edu.pe/sites/default/files/icon_utec.png"
            style={{ marginBottom: "20px", height:"80px", marginLeft:"30px" }}></Image>
        </Box>
      </GridItem>

      <GridItem colStart={3} colEnd={6} >
        <Box w="100%" h="100"  style={{ display: "flex", alignItems: "center" }}>
          <Text fontSize="lg">
            <b> Bienvenido {role} </b>   
            <br/> 
            {name}
          </Text>
        </Box>
      </GridItem>

      <GridItem colSpan={1} colStart={10}>
        <Box w="100%" h="100" style={{ display: "flex", justifyContent: "end" }} >
          <LogOut />
        </Box>
      </GridItem>

    </Grid >

  )
}
