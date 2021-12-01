import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import {
  Box, Heading, Button, SimpleGrid, Grid, GridItem, useDisclosure, Editable, EditablePreview,
  EditableInput, Textarea, Text, ButtonGroup, IconButton, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, List, ListItem, Center
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GetRubricCreation, SaveRubric, RubricReviewPetition, RubricRevisionPetitionAccepted, RubricRevisionPetitionDecline, GetRubricsForImport } from "../../../../api/ApiEndpoints";
import { CreateRubricInterface, CreateRubricResponse, ImportRubric, ImportRubricContent } from "../../../../interfaces/rubric";
import { useToast } from "@chakra-ui/react"

import { _ } from "gridjs-react";
import { Header } from "../../../templates/header/header";

import { Row } from "./Row"
import { HeaderRubric } from "./HeaderRubric"

import { AddIcon, ArrowForwardIcon } from "@chakra-ui/icons"

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
  const [importRubric, setImportRubric] = useState<Array<ImportRubricContent>>([])
  const [clickImportRubric, setClickImportRubric] = useState<{ filter: string, content: Array<any> } | undefined>(undefined)
  const [inRevision, setIsInRevision] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenImport, onOpen: onOpenImport, onClose: onCloseImport } = useDisclosure()

  const [isEditable, setIsEditable] = useState<boolean>(localStorage.getItem("role") === "Docente")

  useEffect(() => {

    GetRubricCreation(courseCode, code).then((val: CreateRubricResponse) => {
      if (val.data[0].content) {
        let rubricContent = JSON.parse(val.data[0].content)
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
        title: "La rúbrica se ha guardado correctamente",
        status: "success",
        isClosable: true,
      })
    }).catch((err) => {
      toast({
        title: "Tuvimos problemas tratando de guardar la rúbrica, por favor inténtelo en otro momento",
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
          title: "No es posible esa combinación de notas, por favor, revíselo antes de mandar.",
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
        title: "Se ha enviado correctamente un correo al área de calidad, por favor espere su revisión.",
        status: "success",
        isClosable: true,
      })
      setIsEditable(false)
    }).catch((err) => {
      toast({
        title: "Tuvimos problemas tratando de enviar el mensaje, por favor inténtelo en otro momento",
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
      toast({
        title: "Se ha aprobado correctamente la rúbrica.",
        status: "success",
        isClosable: true,
      })
      setIsInRevision(true)
    }).catch((err) => {
      toast({
        title: "Tuvimos problemas tratando de aprobar la rúbrica, por favor, inténtalo nuevamente en unos minutos.",
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
        title: "Se ha enviado correctamente el comentario para la rúbrica rechazada.",
        status: "success",
        isClosable: true,
      })
      onClose()
      setIsInRevision(true)
    }).catch((err) => {
      toast({
        title: "Tuvimos problemas tratando de enviar el comentario de la rúbrica, por favor, inténtalo nuevamente en unos minutos.",
        status: "error",
        isClosable: true,
      })
    })
  }

  const ClickImportRubric = (val: ImportRubricContent) => {
    const content = JSON.parse(val.content)
    console.log(content)
    setClickImportRubric({
      content: content,
      filter: val.filter
    })
  }

  const openRubricImport = () => {
    GetRubricsForImport(courseCode, code).then((val: ImportRubric) => {
      setImportRubric(val.data)
      onOpenImport()
    }).catch((err) => {
      console.log(err)
      return
    })
  }
  return (
    <>
      <Header></Header>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mandar a revisión una rúbrica</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              Deja un comentario al profesor indicando el motivo del rechazo de su rúbrica
            </Text>
            <Input placeholder='Su rúbrica fue rechazada por...' onChange={(e) => setComment(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' variant='ghost' mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme='blue' onClick={DeclineRubric}>Enviar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenImport} onClose={onCloseImport} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Importar una rúbrica</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid
              minHeight="700px"
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(6, 1fr)'
              gap={4}
            >
              <GridItem colSpan={2}>
                <Box style={{ border: "2px solid black" }} h="100%" borderRadius={10} overflow="scroll">
                  <List spacing={3}>
                    {
                      importRubric.map((val: ImportRubricContent) => {
                        return (
                          <ListItem p={2}>
                            <Box p={2} _hover={{
                              backgroundColor: "#E4F3F5",
                              cursor: "pointer",
                              borderRadius: "5px"
                            }} onClick={() => ClickImportRubric(val)}  >  {val.filter} </Box>
                          </ListItem>
                        )
                      })
                    }
                  </List>
                </Box>
              </GridItem>
              <GridItem colSpan={4}>
                <Center>
                  <Heading size="lg"> {clickImportRubric?.filter}  </Heading>
                </Center>
                {clickImportRubric?.filter ? <HeaderRubric hasMargins={false} isEditable={false}></HeaderRubric> : null}
                {
                  clickImportRubric?.content?.map((row, index) => {
                    return <Row
                      {...row}
                      i={index}
                      onChange={(name, value) => console.log(index, name, value)}
                      onRemove={() => { }}
                      key={index}
                      isEditable={false}
                      hasMargins={false}
                    />
                  })
                }
                {clickImportRubric?.filter ?
                  <Box style={{ display: "flex", justifyContent: "center" }} mt={10}>
                    <Button variant="solid" colorScheme="blue" size="lg" onClick={() => { setRows(clickImportRubric?.content); onCloseImport() }}> Seleccionar esta rúbrica </Button>
                  </Box> : null}
              </GridItem>
            </Grid>

          </ModalBody>
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
                history.push(`/rubric?name=${course}&cod=${courseCode}`);
              }}
            >
              Regresar a mis rubricas
            </Button>
          </Box>

          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Heading>{"Rúbrica"}</Heading>
          </Box>
        </SimpleGrid>
        <Box mt={10}>
          <Grid templateColumns="repeat(6, 1fr)" gap={6}>
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
                <b>Ciclo</b>
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colStart={6} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {rubricInformation?.cycles}
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
                <b> Semana </b>
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colStart={6} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {rubricInformation?.week}
              </Box>
            </GridItem>
            <GridItem rowSpan={4} colStart={1} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "end" }}>
                <b> Competencia </b>
              </Box>
            </GridItem>

            <GridItem rowSpan={2} colStart={2} colSpan={3} >
              <Box style={{ display: "flex", justifyContent: "center" }}>
              {rubricInformation?.codCompetence} {rubricInformation?.competence}
              </Box>
            </GridItem>

            <GridItem rowSpan={2} colStart={5} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <b> Fecha </b>
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colStart={6} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {rubricInformation?.date}
              </Box>
            </GridItem>
            
            <GridItem rowSpan={6} colStart={1} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "end" }}>
                <b> Criterio de <br/> desempeño </b>
              </Box>
            </GridItem>

            <GridItem rowSpan={2} colStart={2} colSpan={3} >
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {rubricInformation?.criteria}
              </Box>
            </GridItem>

            <GridItem rowSpan={2} colStart={5} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <b> Nivel </b>
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colStart={6} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {rubricInformation?.criteriaLevel}
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colStart={5} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <b> Evaluación </b>
              </Box>
            </GridItem>
            <GridItem rowSpan={2} colStart={6} colSpan={1}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                {rubricInformation?.evaluation}
              </Box>
            </GridItem>
          </Grid>
          {
            isEditable ?
              (<Grid templateColumns="repeat(5, 2fr)" gap={6}>
                <Button onClick={openRubricImport} colorScheme='blue' variant='ghost'>Importar una rúbrica</Button>
                <Box></Box>
                <Box></Box>
                <Button onClick={Save} colorScheme='green' variant='outline'>Guardar</Button>
                <Button onClick={ReviewPetition} rightIcon={<ArrowForwardIcon />} colorScheme='blue'>Enviar a revisión</Button>
              </Grid>) : localStorage.getItem("role") === "Calidad" && !inRevision ? (<Grid templateColumns="repeat(5, 2fr)" gap={6}>
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Button onClick={AcceptRubric} colorScheme='green' variant='outline'>Aprobar</Button>
                <Button onClick={onOpen} colorScheme='red' >Rechazar</Button>
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
                  <Button mr='-px'>Agregar nueva dimensión</Button>
                  <IconButton aria-label='Add to friends' icon={<AddIcon />} />
                </ButtonGroup>) : null}
              </Box>
            </Grid>
            <HeaderRubric isEditable={isEditable} hasMargins={true} />
            {rows.map((row, index) => (
              <Row
                {...row}
                i={index}
                hasMargins={true}
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
