import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from 'query-string'
import { Header } from "../../templates/header/header";
import { Box, Heading, Button, SimpleGrid } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GetRubrics } from "../../../api/ApiEndpoints";
import { Rubric, RubricResponse } from "../../../interfaces/rubric";



const RubricCard = (props: Rubric) => {
    
}

export const RubricPage = () => {
    const history = useHistory()
    const { search } = useLocation()
    const [course, setCourse] = useState(queryString.parse(search).name)
    const [code, setCode] = useState(queryString.parse(search).cod)
    const [rubrik, setRubric] = useState<Array<Rubric>>([{
        code: "", 
        state: "", 
        evaluation: "", 
        date: "", 
        week: "", 
        evidence: "", 
        activity: "",
        canEdit: "",
        students: ""
    }])


    useEffect(() => {
        GetRubrics(code).then((val: RubricResponse) => {
            console.log(val)
            const userRubric = val.data
            setRubric(userRubric)
        }).catch((err) => {
            console.log(err)
        })

    }, [])


    return (<>
        <Header></Header>
        <Box p={7}>
            <SimpleGrid columns={3} spacing={5}>
                <Box>
                    <Button leftIcon={<ArrowBackIcon />} colorScheme="teal" variant="outline" onClick={() => { history.push("/main") }}>
                        Regresar a mis cursos
                    </Button>
                </Box>

                <Box style={{ display: "flex", justifyContent: "center" }} >
                    <Heading>
                        {course}
                    </Heading>
                </Box>

            </SimpleGrid>
        </Box>

    </>)
}

