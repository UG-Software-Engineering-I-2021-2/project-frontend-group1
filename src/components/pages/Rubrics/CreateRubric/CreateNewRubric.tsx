import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import {
  Box, Heading, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper,
  NumberDecrementStepper, Button, Textarea, SimpleGrid, Grid, GridItem, Center, Editable, EditablePreview,
  EditableInput
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GetRubricCreation, SaveRubric } from "../../../../api/ApiEndpoints";
import { CreateRubricInterface, CreateRubricResponse, RubricContent } from "../../../../interfaces/rubric";


import { _ } from "gridjs-react";
import { Header } from "../../../templates/header/header";



const HeaderRubric = () => {
  return (<Grid templateColumns="repeat(6, 1fr)" gap={6} mb={5} ml={20} mt={5} >
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


const Row = ({ onChange, onRemove, dimensiones, excelente, bueno, endesarrollo, noaceptable }) => {
  return (
    <>
      <Grid templateColumns="repeat(6, 1fr)" gap={6} ml={20} mt={5}>
        <Box>
          <Textarea
            value={dimensiones.value}
            onChange={e => onChange("dimensiones", { "value": e.target.value })}
            placeholder="Escriba el descriptor de la dimension..."
            size="sm"
          />
        </Box>

        <Box>
          <Textarea
            value={excelente.value}
            onChange={e => onChange("excelente", { "value": e.target.value, "points": 1.0 })}
            placeholder="Escriba el descriptor excelente..."
            size="sm"
          />
          <NumberInput size="xs" defaultValue={1} max={20} step={0.5} onChange={value => onChange("excelente", { "points": value, "value": excelente.value })}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>

        <Box>
          <Textarea
            value={bueno.value}
            onChange={e => onChange("bueno", { "value": e.target.value, "points": 1.0 })}
            placeholder="Escriba el descriptor bueno..."
            size="sm"
          />

          <NumberInput size="xs" defaultValue={1} max={20} step={0.5} onChange={value => onChange("bueno", { "points": value, "value": bueno.value })}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>

        <Box>
          <Textarea
            value={endesarrollo.value}
            onChange={e => onChange("endesarrollo", { "value": e.target.value, "points": 1.0 })}
            placeholder="Escriba el descriptor en desarrollo..."
            size="sm"
          />
          <NumberInput size="xs" defaultValue={1} max={20} step={0.5} onChange={value => onChange("endesarrollo", { "points": value, "value": endesarrollo.value })}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>

        <Box>

          <Textarea
            value={noaceptable.value}
            onChange={e => onChange("noaceptable", { "value": e.target.value, "points": 1.0 })}
            placeholder="Escriba el descriptior no aceptable..."
            size="sm"
          />
          <NumberInput size="xs" defaultValue={1} max={20} step={0.5} onChange={value => onChange("endesarrollo", { "points": value, "value": noaceptable.value })}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

        </Box>
        <Button w="25%" onClick={onRemove}>X</Button>
      </Grid>
    </>
  );
}

const defaultState = {
  dimensiones: "",
  excelente: "",
  bueno: "",
  endesarrollo: "",
  noaceptable: ""
};

export const CreateNewRubric = () => {
  const history = useHistory();
  const { search } = useLocation();
  const [course, setCourse] = useState(queryString.parse(search).course);
  const [code, setCode] = useState(queryString.parse(search).code);
  const [courseCode, setCourseCode] = useState(queryString.parse(search).courseCode)
  const [rubricInformation, setRubricInformation] = useState<CreateRubricInterface>()

  const [rows, setRows] = useState([defaultState]);


  useEffect(() => {
    GetRubricCreation(courseCode, code).then((val: CreateRubricResponse) => {
      const rubricContent = JSON.parse(val.data[0].content)
      setRows(rubricContent)
      const rubricInfo = val.data[0]
      setRubricInformation(rubricInfo)
    }).catch((err) => {
      console.log(err)
    })
  }, [])


  const handleOnChange = (index, name, value) => {
    const copyRows = [...rows];
    copyRows[index] = {
      ...copyRows[index],
      [name]: value
    };
    setRows(copyRows);
  };

  const handleOnAdd = () => {
    setRows(rows.concat(defaultState));
  };

  const handleOnRemove = index => {
    const copyRows = [...rows];
    copyRows.splice(index, 1);
    setRows(copyRows);
  };

  const Save = () => {

    SaveRubric({ content: rows, title: rubricInformation?.title || "No title", activity: rubricInformation?.activity || "", semester: "2021 - 2", courseCode: courseCode, rubricCode: code }).then((val) => {
      console.log("save new rubric", val)
    }).catch((err) => {
      console.log(err)
    })
  }

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
              <Editable defaultValue={rubricInformation?.activity || "No title"}>
                <EditablePreview />
                <EditableInput />
              </Editable>
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
          </Grid>
          <Grid templateColumns="repeat(5, 2fr)" gap={6}>
            <Box></Box>
            <Button onClick={handleOnAdd}>Agregar nuevo descriptor</Button>
            <Button onClick={Save}>Guardar</Button>
            <Button onClick={Save}>Enviar a revision</Button>
            <Box></Box>
          </Grid>

          <Box minH={500}>
            <Center mt={20}>
              <Editable   fontSize="2xl" defaultValue={rubricInformation?.title || "No title"}>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Center>
            <HeaderRubric />
            {rows.map((row, index) => (
              <Row
                {...row}
                onChange={(name, value) => handleOnChange(index, name, value)}
                onRemove={() => handleOnRemove(index)}
                key={index}
              />
            ))}
          </Box>

        </Box>
      </Box>
    </>
  );
};
