import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { Header } from "../../../templates/header/header";
import {
  Box, Editable, EditableInput, EditablePreview,
  Heading,
  Button,
  SimpleGrid,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { CreateRubric } from "../../../../api/ApiEndpoints";
import { CreateRubricInterface, CreateRubricResponse } from "../../../../interfaces/rubric";



export const CreateNewRubric = () => {
  const history = useHistory();
  const { search } = useLocation();
  const [course, setCourse] = useState(queryString.parse(search).course);
  const [code, setCode] = useState(queryString.parse(search).code);
  const [courseCode, setCourseCode] = useState(queryString.parse(search).courseCode)
  const [rubricInformation, setRubricInformation] = useState<CreateRubricInterface>()

  useEffect(() => {
    CreateRubric(courseCode, code).then((val: CreateRubricResponse) => {
      const rubric = val.data[0]
      setRubricInformation(rubric)
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
              <Box style={{ display: "flex", justifyContent: "end" }}>
                Curso
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colStart={2} colSpan={3} >
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {course}
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colStart={5} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                Ciclo: {rubricInformation?.cycles}
              </Box>
            </GridItem>
            <GridItem rowSpan={3} colStart={1} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "end" }}>
                Actividad
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colStart={2} colSpan={3} >
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {rubricInformation?.activity}
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colStart={5} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                Semana: {rubricInformation?.week}
              </Box>
            </GridItem>

            <GridItem rowSpan={4} colStart={1} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "end" }}>
                Competencia
              </Box>
            </GridItem>

            <GridItem rowSpan={2} colStart={2} colSpan={3} >
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {rubricInformation?.competence}
              </Box>
            </GridItem>

            <GridItem rowSpan={2} colStart={5} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                Fecha: {rubricInformation?.date}
              </Box>
            </GridItem>

            <GridItem rowSpan={4} colStart={1} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "end" }}>
                Nombre del alumno
              </Box>
            </GridItem>

            <GridItem rowSpan={2} colStart={2} colSpan={3} >
              <Box >
                <Editable defaultValue="Nombre del alumno..." textAlign="center" fontSize="lg">
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Box>
            </GridItem>

          </Grid>
        </Box>
      </Box>
    </>
  );
};
