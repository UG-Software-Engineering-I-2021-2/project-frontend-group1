import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from 'query-string'
import { Header } from "../../templates/header/header";
import { Box, Stack, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";


export const Rubric = () => {
    const history = useHistory()
    const { search } = useLocation()
    const [course, setCourse] = useState(queryString.parse(search).course)

    return (<>
        <Header></Header>
        <Box p={7}>
            <Stack direction="row" spacing={4}>
                <Button leftIcon={<ArrowBackIcon />} colorScheme="teal" variant="outline" onClick={()=>{history.push("/main")}}>
                    Regresar a mis cursos
                </Button>
            </Stack>
        </Box>
        <Box pl={10} pt={5}>
            {course}
        </Box>
    </>)
}