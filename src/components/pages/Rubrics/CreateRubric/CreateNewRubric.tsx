import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { Header } from "../../../templates/header/header";
import {
  Box,
  Heading,
  Button,
  SimpleGrid,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { CreateRubric } from "../../../../api/ApiEndpoints";



export const CreateNewRubric = () => {
  const history = useHistory();
  const { search } = useLocation();
  const [course, setCourse] = useState(queryString.parse(search).course);
  const [code, setCode] = useState(queryString.parse(search).code);


  useEffect(() => {
    CreateRubric(course, code).then((val)=> {
      console.log(val)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <>
      <Header></Header>
      <Box p={7}>
        <SimpleGrid columns={3} spacing={5}>
          <Box>
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme="teal"
              variant="outline"
              onClick={() => {
                history.push("/main");
              }}
            >
              Regresar a mis cursos
            </Button>
          </Box>

          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Heading>{"Rubrica"}</Heading>
          </Box>
        </SimpleGrid>
        <Box mt={10}>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
             <GridItem rowSpan={2} colStart={1} colSpan={1}>
              <Box style={{display:"flex", justifyContent:"end"}}>
                Curso
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colStart={2} colSpan={3} >
              <Box style={{display:"flex", justifyContent:"center"}}>
                {course}
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colStart={5} colSpan={1}>
              <Box style={{display:"flex", justifyContent:"center"}}>
                Ciclo
              </Box>
            </GridItem>
            <GridItem colSpan={2} bg="papayawhip" />
            <GridItem colSpan={2} bg="papayawhip" />
            <GridItem colSpan={4} bg="tomato" />
          </Grid>
        </Box>
      </Box>
    </>
  );
};
