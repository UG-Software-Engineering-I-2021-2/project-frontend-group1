import React from "react"

import {
    Box, Heading, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper,
    NumberDecrementStepper, Button, Textarea, SimpleGrid, Grid, GridItem, Center, Editable, EditablePreview,
    EditableInput, Text
} from "@chakra-ui/react";


export const Row = ({ onChange, onRemove, dimensiones, excelente, bueno, endesarrollo, noaceptable, isEditable, i, hasMargins }) => {
    return (
        <>
            <Grid templateColumns={isEditable ? "repeat(6, 1fr)" : "repeat(5, 1fr)"} gap={6} ml={hasMargins ? 20 : 0} p={5} backgroundColor={`${i %2 === 1 ? "#E4F3F6" : null}`}>
                <Box>
                    {isEditable ? <Textarea
                        value={dimensiones.value}
                        onChange={e => onChange("dimensiones", { "value": e.target.value })}
                        placeholder="Escriba la dimensión..."
                        size="sm"
                    /> : <Box w={hasMargins ? "100%" : 120}> <Text noOfLines={[1, 2, 3]}> {dimensiones.value} </Text> </Box>}
                </Box>

                <Box>
                    {isEditable ? <Textarea
                        value={excelente.value}
                        onChange={e => onChange("excelente", { "value": e.target.value, "points": 1.0 })}
                        placeholder="Escriba el descriptor Excelente..."
                        size="sm"
                    /> : <Box w={hasMargins ? "100%" : 120}> <Text> {excelente.value} </Text> </Box>}
                    {isEditable ? <NumberInput size="xs" value={excelente.points}  max={20}  step={0.5} min={0} onChange={value => onChange("excelente", { "points": value, "value": excelente.value })}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput> : <Text> Total Points: {excelente.points} </Text>}
                </Box>

                <Box>
                    {isEditable ? (<><Textarea
                        value={bueno.value}
                        onChange={e => onChange("bueno", { "value": e.target.value, "points": 1.0 })}
                        placeholder="Escriba el descriptor Bueno..."
                        size="sm"
                    />
                        <NumberInput size="xs" value={bueno.points}  max={20} step={0.5}  min={0}  onChange={value => onChange("bueno", { "points": value, "value": bueno.value })}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput></>) : (<>
                            <Box w={hasMargins ? "100%" : 120}>   <Text noOfLines={[1, 2, 3]}> {bueno.value} </Text> </Box>
                            <Text> Total Points: {bueno.points} </Text>
                        </>)}
                </Box>

                <Box>

                    {isEditable ? (
                        <><Textarea
                            value={endesarrollo.value}
                            onChange={e => onChange("endesarrollo", { "value": e.target.value, "points": 1.0 })}
                            placeholder="Escriba el descriptor En desarrollo..."
                            size="sm"
                        />
                            <NumberInput size="xs" value={endesarrollo.points}  max={20} step={0.5}  min={0}  onChange={value => onChange("endesarrollo", { "points": value, "value": endesarrollo.value })}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput></>) :
                        (<>
                           <Box w={hasMargins ? "100%" : 120}> <Text> {endesarrollo.value} </Text> </Box>
                            <Text> Total Points: {endesarrollo.points} </Text>
                        </>)}


                </Box>

                <Box>

                    {isEditable ? (
                        <><Textarea
                            value={noaceptable.value}
                            onChange={e => onChange("noaceptable", { "value": e.target.value, "points": 1.0 })}
                            placeholder="Escriba el descriptor No aceptable..."
                            size="sm"
                        />
                            <NumberInput size="xs" value={noaceptable.points}  max={20} step={0.5}  min={0}  onChange={value => onChange("noaceptable", { "points": value, "value": noaceptable.value })}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput></>) :
                        (<>
                           <Box w={hasMargins ? "100%" : 120}> <Text> {noaceptable.value} </Text> </Box>
                            <Text> Total Points: {noaceptable.points} </Text>
                        </>)}



                </Box>
                {
                    isEditable ? <Button colorScheme='red' w="25%" onClick={onRemove}>X</Button> : null
                }
            </Grid>
        </>
    );
}