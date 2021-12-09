import React, { useState } from "react"

import {
    Box, Grid, Text
} from "@chakra-ui/react";


export const Row = ({ onChange, dimensiones, excelente, bueno, endesarrollo, noaceptable, i, hasMargins }) => {


    const clickDescriptor = (name: string) => {
        const curr = {
            "bueno": false,
            "excelente": false,
            "endesarrollo": false,
            "noaceptable": false
        }

        curr[name] = true
        onChange(name)
    }

    return (
        <>
            <Grid templateColumns="repeat(5, 1fr)" gap={6} ml={hasMargins ? 20 : 0} p={3} backgroundColor={`${i % 2 === 1 ? "#E4F3F6" : null}`}>
                <Box>
                    <Box w={hasMargins ? "100%" : 120}> <Text noOfLines={[1, 2, 3]}> {dimensiones.value} </Text> </Box>
                </Box>
                <Box _hover={{ cursor: "pointer", backgroundColor: (i % 2 === 1 ? "#F5F8FA" : "#D9ECF7")}} p={4} backgroundColor={excelente.selected ?  (i % 2 === 1 ? "#F5F8FA" : "#D9ECF7") : undefined } onClick={()=>{ clickDescriptor("excelente")}}>
                    {<Box w={hasMargins ? "100%" : 120}> <Text> {excelente.value} </Text> </Box>}
                    {<Text><b> Total Points: {excelente.points} </b> </Text>}
                </Box>

                <Box  _hover={{ cursor: "pointer", backgroundColor: (i % 2 === 1 ? "#F5F8FA" : "#D9ECF7")}} p={4}  backgroundColor={bueno.selected ? (i % 2 === 1 ? "#F5F8FA" : "#D9ECF7") : undefined }  onClick={()=>{ clickDescriptor("bueno")}}> 
                    {(<>
                        <Box w={hasMargins ? "100%" : 120}>   <Text noOfLines={[1, 2, 3]}> {bueno.value} </Text> </Box>
                        <Text> <b> Total Points: {bueno.points} </b> </Text>
                    </>)}
                </Box>
                <Box  _hover={{ cursor: "pointer", backgroundColor: (i % 2 === 1 ? "#F5F8FA" : "#D9ECF7")}}  p={4} backgroundColor={endesarrollo.selected ? (i % 2 === 1 ? "#F5F8FA" : "#D9ECF7") : undefined }  onClick={()=>{ clickDescriptor("endesarrollo")}}>
                    {(<>
                        <Box w={hasMargins ? "100%" : 120}> <Text> {endesarrollo.value} </Text> </Box>
                        <Text> <b> Total Points: {endesarrollo.points} </b> </Text>
                    </>)}
                </Box>
                <Box  _hover={{ cursor: "pointer", backgroundColor: (i % 2 === 1 ? "#F5F8FA" : "#D9ECF7")}} p={4} backgroundColor={noaceptable.selected ? (i % 2 === 1 ? "#F5F8FA" : "#D9ECF7") : undefined }  onClick={()=>{ clickDescriptor("noaceptable")}}>
                    {(<>
                        <Box w={hasMargins ? "100%" : 120}> <Text> {noaceptable.value} </Text> </Box>
                        <Text> <b> Total Points: {noaceptable.points} </b> </Text>
                    </>)}
                </Box>
            </Grid>
        </>
    );
}
