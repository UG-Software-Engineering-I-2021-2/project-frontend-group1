import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import {
  Box, Heading, Button, SimpleGrid, Grid, GridItem, Center, Editable, EditablePreview,
  EditableInput, Textarea, Text
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GetRubricCreation, SaveRubric, RubricReviewPetition } from "../../../../api/ApiEndpoints";
import { CreateRubricInterface, CreateRubricResponse } from "../../../../interfaces/rubric";
import { useToast } from "@chakra-ui/react"

import { _ } from "gridjs-react";
import { Header } from "../../../templates/header/header";

import { Row } from "./Row"
import { HeaderRubric } from "./HeaderRubric"



const defaultState = {
  dimensiones: {
    value: "",
    points: 1,
  },
  excelente: {
    value: "",
    points: 1,
  },
  bueno: {
    value: "",
    points: 1,
  },
  endesarrollo: {
    value: "",
    points: 1,
  },
  noaceptable: {
    value: "",
    points: 1,
  }
};

export const CreateNewRubric = () => {
  const history = useHistory();
  const toast = useToast()
  const { search } = useLocation();
  const [course, setCourse] = useState(queryString.parse(search).course);
  const [code, setCode] = useState(queryString.parse(search).code);
  const [courseCode, setCourseCode] = useState(queryString.parse(search).courseCode)
  const [rubricInformation, setRubricInformation] = useState<CreateRubricInterface>()
  const [title, setTitle] = useState("No title")
  const [activity, setActivity] = useState("")
  const [rows, setRows] = useState([defaultState]);

  const [isEditable, setIsEditable] = useState<boolean>(localStorage.getItem("role") === "Docente")

  useEffect(() => {

    GetRubricCreation(courseCode, code).then((val: CreateRubricResponse) => {
      if (val.data[0].content) {
        const rubricContent = JSON.parse(val.data[0].content)
        setRows(rubricContent)
      }
      const rubricInfo = val.data[0]
      setTitle(rubricInfo.title)
      setActivity(rubricInfo.activity)
      setIsEditable(rubricInfo.state === "Sin asignar")
      setRubricInformation(rubricInfo)
    }).catch((err) => {
      toast({
        title: "We have a issue, try again please",
        status: "error",
        isClosable: true,
      })
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
    SaveRubric({ content: rows, title: title, activity: activity || "", semester: "2021 - 2", courseCode: courseCode, rubricCode: code, courseName: course }).then((val) => {
      toast({
        title: "La rubrica se ha guardado correctamente",
        status: "success",
        isClosable: true,
      })
    }).catch((err) => {
      toast({
        title: "Tuvimos problemas tratando de guardar la rubrica, por favor intentelo en otro momento",
        status: "error",
        isClosable: true,
      })
    })
  }

  const ReviewPetition = () => {
    let excelente  = 0, bueno = 0, endesarrollo = 0, noaceptable = 0
    rows.forEach((val) => {
      excelente += Number(val.excelente.points)
      bueno += Number(val.bueno.points)
      endesarrollo += Number(val.endesarrollo.points)
      noaceptable += Number(val.noaceptable.points)
      if(excelente < bueno || bueno < endesarrollo || endesarrollo < noaceptable) {
        toast({
          title:"No es posible esa combinacion de notas, por favor, reviselo antes de mandar.",
          status: "error",
          isClosable: true
        })
        return
      }
    })
    if(excelente !== 20) {
      toast({
        title: "El valor de excelente no debe exceder los 20 puntos y no puede ser menor a los 20 puntos",
        status: "error",
        isClosable: true
      })
    }

    RubricReviewPetition({ content: rows, title: title, activity: activity || "", semester: "2021 - 2", courseCode: courseCode, rubricCode: code, courseName: course }).then((val) => {
      toast({
        title: "Se ha enviado correctamente un email al coordinador, por favor espere su revision.",
        status: "success",
        isClosable: true,
      })
      setIsEditable(false)
    }).catch((err) => {
      toast({
        title: "Tuvimos problemas tratando de enviar el mensaje, por favor intentelo en otro momento",
        status: "error",
        isClosable: true,
      })
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
                {
                  isEditable ? <Textarea
                    value={activity}
                    onChange={(e) => { setActivity(e.target.value) }}
                    size="md"
                  /> : <Text> {activity} </Text>
                }
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
          {
            isEditable ?
              (<Grid templateColumns="repeat(5, 2fr)" gap={6}>
                <Box></Box>
                <Button onClick={handleOnAdd}>Agregar nuevo descriptor</Button>
                <Button onClick={Save}>Guardar</Button>
                <Button onClick={ReviewPetition}>Enviar a revision</Button>
                <Box></Box>
              </Grid>) : localStorage.getItem("role") === "Calidad" ? (<Grid templateColumns="repeat(5, 2fr)" gap={6}>
                <Box></Box>
                <Box></Box>
                <Button onClick={console.log}>Aprovar</Button>
                <Button onClick={console.log}>Declinar</Button>
                <Box></Box>
              </Grid>) : null
          }
          <Box minH={500}>
            <Center mt={20}>
              {isEditable ? <Editable fontSize="2xl" value={title} onChange={(e) => setTitle(e)}>
                <EditablePreview />
                <EditableInput />
              </Editable> : <Heading mb={5}> {title} </Heading>}
            </Center>
            <HeaderRubric isEditable={isEditable} />
            {rows.map((row, index) => (
              <Row
                {...row}
                onChange={(name, value) => handleOnChange(index, name, value)}
                onRemove={() => handleOnRemove(index)}
                key={index}
                isEditable={isEditable}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};
