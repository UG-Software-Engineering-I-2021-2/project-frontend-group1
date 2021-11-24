import React from "react"

import {
    Box, Heading, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper,
    NumberDecrementStepper, Button, Textarea, SimpleGrid, Grid, GridItem, Center, Editable, EditablePreview,
    EditableInput
} from "@chakra-ui/react";

export const HeaderRubric = ({isEditable}) => {
    return (<Grid templateColumns={isEditable ? "repeat(6, 1fr)" : "repeat(5, 1fr)"}  gap={6} mb={5} ml={20} mt={5} >
        <Box style={{ display: "flex", justifyContent: "center" }}>
            <Heading as="p" size="md">
                Dimensiones
            </Heading>
        </Box>
        <Box style={{ display: "flex", justifyContent: "center" }}>
            <Heading as="p" size="md">
                Excelente
            </Heading>
        </Box>
        <Box style={{ display: "flex", justifyContent: "center" }}>
            <Heading as="p" size="md">
                Bueno
            </Heading>
        </Box>
        <Box style={{ display: "flex", justifyContent: "center" }}>
            <Heading as="p" size="md">
                En desarrollo
            </Heading>
        </Box>
        <Box style={{ display: "flex", justifyContent: "center" }}>
            <Heading as="p" size="md">
                No aceptable
            </Heading>
        </Box>
    </Grid>)
}