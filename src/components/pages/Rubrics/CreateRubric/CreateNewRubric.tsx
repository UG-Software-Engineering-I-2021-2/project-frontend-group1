import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import {
  Box, Heading, Button, SimpleGrid, Grid, GridItem, useDisclosure, Editable, EditablePreview,
  EditableInput, Textarea, Text, ButtonGroup, IconButton, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GetRubricCreation, SaveRubric, RubricReviewPetition, RubricRevisionPetitionAccepted , RubricRevisionPetitionDecline } from "../../../../api/ApiEndpoints";
import { CreateRubricInterface, CreateRubricResponse } from "../../../../interfaces/rubric";
import { useToast } from "@chakra-ui/react"

import { _ } from "gridjs-react";
import { Header } from "../../../templates/header/header";

import { Row } from "./Row"
import { HeaderRubric } from "./HeaderRubric"

import { AddIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { setCommentRange } from "typescript";

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
  const [comment, setComment] = useState<string>("")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isEditable, setIsEditable] = useState<boolean>(localStorage.getItem("role") === "Docente")

  useEffect(() => {

    GetRubricCreation(courseCode, code).then((val: CreateRubricResponse) => {
      if (val.data[0].content) {
        let rubricContent = JSON.parse(val.data[0].content)
        console.log(rubricContent)
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
    let excelente = 0, bueno = 0, endesarrollo = 0, noaceptable = 0
    rows.forEach((val) => {
      excelente += Number(val.excelente.points)
      bueno += Number(val.bueno.points)
      endesarrollo += Number(val.endesarrollo.points)
      noaceptable += Number(val.noaceptable.points)
      if (excelente < bueno || bueno < endesarrollo || endesarrollo < noaceptable) {
        toast({
          title: "No es posible esa combinacion de notas, por favor, reviselo antes de mandar.",
          status: "error",
          isClosable: true
        })
        return
      }
    })
    if (excelente !== 20) {
      toast({
        title: "El valor de excelente no debe exceder los 20 puntos y no puede ser menor a los 20 puntos",
        status: "error",
        isClosable: true
      })
      return
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


  const AcceptRubric = () => {
    RubricRevisionPetitionAccepted({
      rubricCode: code,
      semester: "2021 - 2",
      courseCode: courseCode,
      courseName: course,
      title: title,
    }).then((val) => {
      console.log("Rubric accepted")
      toast({
        title: "Se ha aprobado correctamente la rúbrica.",
        status: "success",
        isClosable: true,
      })
    }).catch((err) => {
      toast({
        title: "Tuvimos problemas tratando de aprobar la rubrica, por favor, intentalo nuevamente en unos minutos.",
        status: "error",
        isClosable: true,
      })
    })
  }

  const DeclineRubric = () => {
    RubricRevisionPetitionDecline({
      rubricCode: code,
      semester: "2021 - 2",
      courseCode: courseCode,
      courseName: course,
      title: title,
      comment: comment
    }).then((val) => {
      toast({
        title: "Se ha enviado correctamente el comentario para la rubrica rechazada.",
        status: "success",
        isClosable: true,
      })
    }).catch((err) => {
      toast({
        title: "Tuvimos problemas tratando de enviar el comentario de la rubrica, por favor, intentalo nuevamente en unos minutos.",
        status: "error",
        isClosable: true,
      })
    })
  }

  return (
    <>
      <Header></Header>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mandar a revision una rubrica</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              Deja un comentario al profesor para indicarle porque su rubrica fue rechazada
            </Text>
            <Input  placeholder='Su rubrica fue rechazada por...' onChange={(e) => setComment(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red'variant='ghost' mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme='blue' onClick={DeclineRubric}>Enviar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
                <b> Curso </b>
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colStart={2} colSpan={3} >
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {course}
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colStart={5} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <b>Ciclo:</b> {rubricInformation?.cycles}
              </Box>
            </GridItem>
            <GridItem rowSpan={3} colStart={1} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "end" }}>
                <b> Actividad </b>
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
                <b> Semana: </b> {rubricInformation?.week}
              </Box>
            </GridItem>

            <GridItem rowSpan={4} colStart={1} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "end" }}>
                <b> Competencia </b>
              </Box>
            </GridItem>

            <GridItem rowSpan={2} colStart={2} colSpan={3} >
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {rubricInformation?.competence}
              </Box>
            </GridItem>

            <GridItem rowSpan={2} colStart={5} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <b> Fecha: </b> {rubricInformation?.date}
              </Box>
            </GridItem>
          </Grid>
          {
            isEditable ?
              (<Grid templateColumns="repeat(5, 2fr)" gap={6}>
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Button onClick={Save} colorScheme='green' variant='outline'>Guardar</Button>
                <Button onClick={ReviewPetition} rightIcon={<ArrowForwardIcon />} colorScheme='blue'>Enviar a revision</Button>
              </Grid>) : localStorage.getItem("role") === "Calidad" ? (<Grid templateColumns="repeat(5, 2fr)" gap={6}>
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Button onClick={AcceptRubric} colorScheme='green'  variant='outline'>Aprobar</Button>
                <Button onClick={onOpen} colorScheme='red' >Declinar</Button>
              </Grid>) : null
          }
          <Box minH={500}>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={10} mb={3}>
              <Box></Box>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {isEditable ? <Editable fontSize="2xl" value={title} onChange={(e) => setTitle(e)}>
                  <EditablePreview />
                  <EditableInput />
                </Editable> : <Heading mb={5}> {title} </Heading>}
              </Box>
              <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                {isEditable ? (<ButtonGroup size='sm' isAttached variant='outline' onClick={handleOnAdd}>
                  <Button mr='-px'>Agregar nueva dimension</Button>
                  <IconButton aria-label='Add to friends' icon={<AddIcon />} />
                </ButtonGroup>) : null}
              </Box>
            </Grid>
            <HeaderRubric isEditable={isEditable} />
            {rows.map((row, index) => (
              <Row
                {...row}
                i={index}
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
