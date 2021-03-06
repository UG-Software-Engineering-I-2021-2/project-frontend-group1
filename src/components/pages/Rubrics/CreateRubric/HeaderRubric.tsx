import React from "react"

import {
    Box, Heading, Grid, 
} from "@chakra-ui/react";

export const HeaderRubric = ({isEditable, hasMargins, isFinished}) => {
    return (<Grid templateColumns={isEditable ? "repeat(6, 1fr)" : "repeat(5, 1fr)"}   ml={ hasMargins ? 20 : 0} p={hasMargins ? 5 : 4} backgroundColor={isFinished ? "#00C24E" : "#1BA7CE"} color="white">
        <Box style={{ display: "flex", justifyContent: "center", alignItems:"center" }}>
            <Heading as="p" size="md">
                Dimensiones
            </Heading>
        </Box>
        <Box style={{ display: "flex", justifyContent: "center", alignItems:"center" }}>
            <Heading as="p" size="md">
                Excelente
            </Heading>
        </Box>
        <Box style={{ display: "flex", justifyContent: "center", alignItems:"center" }}>
            <Heading as="p" size="md">
                Bueno
            </Heading>
        </Box>
        <Box style={{ display: "flex", justifyContent: "center", alignItems:"center" }}>
            <Heading as="p" size="md">
                En desarrollo
            </Heading>
        </Box>
        <Box style={{ display: "flex", justifyContent: "center", alignItems:"center" }}>
            <Heading as="p" size="md">
                No aceptable
            </Heading>
        </Box>
        <Box >
        </Box>
    </Grid>)
}