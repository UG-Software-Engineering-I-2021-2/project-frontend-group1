import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from 'query-string'
import { Header } from "../../templates/header/header";
import { Box, Heading, Button, SimpleGrid } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";


export const Rubric = () => {
    const history = useHistory()
    const { search } = useLocation()
    const [course, setCourse] = useState(queryString.parse(search).name)
    const [code, setCode] = useState(queryString.parse(search).code)

    return (<>
        <Header></Header>
        <Box p={7}>
            <SimpleGrid columns={3} spacing={5}>
                <Box>
                    <Button leftIcon={<ArrowBackIcon />} colorScheme="teal" variant="outline" onClick={() => { history.push("/main") }}>
                        Regresar a mis cursos
                    </Button>
                </Box>

                <Box style={{display:"flex", justifyContent:"center"}} >
                    <Heading>
                        {course}
                    </Heading>
                </Box>

            </SimpleGrid>
        </Box>

    </>)
}