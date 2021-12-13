import React, { useState, useEffect } from "react"
import { Header } from "../../../templates/header/header";
import queryString from "query-string";

import {
    Box, Heading, Button, SimpleGrid, AccordionPanel, AccordionItem, Accordion, Grid,
    AccordionButton, AccordionIcon, GridItem, Text, Select, useToast, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useHistory, useLocation } from "react-router";
import { GetRubricInfoForGradeStudent, GetStudentsBySection, GetStudentsGradeBySection, RubricGradeSave, RubricGradeSaveFinish } from "../../../../api/ApiEndpoints";
import { CreateRubricInterface, CreateRubricResponse } from "../../../../interfaces/rubric";
import { Row } from "./Row"
import { HeaderRubric } from "../CreateRubric/HeaderRubric";
import { CompetenceRubric, Student, StudentGrade, StudentResponse, StudentsGradeResponse } from "../../../../interfaces/students";

const defaultState = {
    dimensiones: {
        value: "",
        points: 1,
        selected: false
    },
    excelente: {
        value: "",
        points: 1,
        selected: false
    },
    bueno: {
        value: "",
        points: 1,
        selected: false
    },
    endesarrollo: {
        value: "",
        points: 1,
        selected: false
    },
    noaceptable: {
        value: "",
        points: 1,
        selected: false
    }
};

export const GradeRubric = () => {
    const history = useHistory()
    const { search } = useLocation();
    const toast = useToast()
    const [course, setCourse] = useState(queryString.parse(search).course);
    const [rubricCode, setCode] = useState(queryString.parse(search).code);
    const [courseCode, setCourseCode] = useState(queryString.parse(search).courseCode)
    const [rubricInformation, setRubricInformation] = useState<CreateRubricInterface>()

    const [title, setTitle] = useState("No title")
    const [activity, setActivity] = useState("")
    const [rows, setRows] = useState([defaultState]);

    const [sections, setSections] = useState<string>()

    const [students, setStudents] = useState<Array<Student>>()

    const [bueno, setBueno] = useState(0)
    const [excelente, setExcelente] = useState(0)
    const [endesarrollo, setEndesarrollo] = useState(0)
    const [noaceptable, setNoaceptable] = useState(0)

    const [competenceLeft, setCompetenceLeft] = useState(0)
    const [competenceRight, setCompetenceRight] = useState(0)
    const [finalGrade, setFinalGrade] = useState(0)

    const [finish, setFinish] = useState(false)

    const [studentSelected, setStudentSelected] = useState<Student | string | undefined>()

    const [isEditable, setIsEditable] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        const role = localStorage.getItem("role")

        if(role) {
            if(role === "Calidad"){
                setIsEditable(false)
            }
        }
    }, [])

    useEffect(() => {
        GetRubricInfoForGradeStudent(courseCode, rubricCode).then((val: CreateRubricResponse) => {
            if (val.data[0].content) {
                let rubricContent = JSON.parse(val.data[0].content)
                setRows(rubricContent)
                localStorage.setItem("rubricInfo", JSON.stringify(rubricContent))
            }
            const rubricInfo = val.data[0]
            setTitle(rubricInfo.title)
            setActivity(rubricInfo.activity)
            setRubricInformation(rubricInfo)
            setIsEditable(!(rubricInfo.state === "Cumplidos"))
            console.log(!(rubricInfo.state === "Cumplidos"))
            console.log(rubricInfo)
        }).catch((err) => {
            toast({
                title: "We have a issue, try again please",
                status: "error",
                isClosable: true,
            })
        })
    }, [])

    useEffect(() => {
        GetStudentsBySection(courseCode, rubricCode, sections).then((val: StudentResponse) => {
            setStudents(val.data)
        }).catch((err) => {
            toast({
                title: "We have a issue, try again please",
                status: "error",
                isClosable: true,
            })
        })
    }, [sections])

    useEffect(() => {
        let bueno = 0, excelente = 0, endesarrollo = 0, noaceptable = 0, finalGrade = 0
        rows.forEach((val) => {
            if (val.bueno.selected) {
                bueno += 1
                finalGrade += Number(val.bueno.points)
            }
            if (val.excelente.selected) {
                excelente += 1
                finalGrade += Number(val.excelente.points)
            }
            if (val.endesarrollo.selected) {
                finalGrade += Number(val.endesarrollo.points)
                endesarrollo += 1
            }
            if (val.noaceptable.selected) {
                finalGrade += Number(val.noaceptable.points)
                noaceptable += 1
            }
        })

        const total = rows.length
        setCompetenceLeft(((100 * (bueno + excelente)) / total))
        setCompetenceRight(((100 * (endesarrollo + noaceptable)) / total))
        setBueno(bueno)
        setExcelente(excelente)
        setEndesarrollo(endesarrollo)
        setNoaceptable(noaceptable)
        setFinalGrade(finalGrade)
    }, [rows])

    useEffect(() => {

        GetStudentsGradeBySection(courseCode, rubricCode, String(studentSelected)).then((val: StudentsGradeResponse) => {
            const data = val.data
            const compentenceGrade: CompetenceRubric = JSON.parse(data.competenceGrade)
            const studentGrade: StudentGrade = JSON.parse(data.studentGrade)
            setCompetenceLeft(compentenceGrade.competenceLeft)
            setCompetenceRight(compentenceGrade.competenceLeft)
            setBueno(studentGrade.bueno)
            setFinish(data.finished)
            setExcelente(studentGrade.excelente)
            setNoaceptable(studentGrade.noaceptable)
            setEndesarrollo(studentGrade.endesarrollo)
            setFinalGrade(studentGrade.total)
            const content = JSON.parse(studentGrade.content)
            setRows(content)
        }).catch((err) => {
            setCompetenceLeft(0)
            setCompetenceRight(0)
            setBueno(0)
            setExcelente(0)
            setNoaceptable(0)
            setEndesarrollo(0)
            setFinalGrade(0)
            setFinish(false)
            const rowsRaw = localStorage.getItem("rubricInfo")
            if (!rowsRaw) {
                return
            }
            const rowsContent = JSON.parse(rowsRaw)
            setRows(rowsContent)
        })
    }, [studentSelected])

    const handleOnChange = (index: number, value: any) => {
        const copyRows = [...rows];
        copyRows[index].bueno.selected = false
        copyRows[index].excelente.selected = false
        copyRows[index].endesarrollo.selected = false
        copyRows[index].noaceptable.selected = false
        copyRows[index][value]["selected"] = true
        setRows(copyRows);
    }

    const FinishGradeByStudent = () => {
        RubricGradeSaveFinish(rubricCode).then((val) => {
            toast({
                title:"La sección se ha guardado correctamente",
                status:"success",
                isClosable: true,
            })
        }).catch((err) => {
            toast({
                title: "We have a issue, try again please",
                status: "error",
                isClosable: true,
            })
        })
    }

    const GradeRubricByStudent = () => {
        if (!studentSelected || studentSelected.toString().length === 0) {
            toast({
                title: "Tiene que escoger a un alumno para poder hacer la calificacion!",
                status: "error",
                isClosable: true,
            })
            return
        }
        let finished = false, count = 0;
        rows.forEach((val) => {
            if (val.bueno.selected || val.endesarrollo.selected || val.excelente.selected || val.noaceptable.selected) {
                count++
            }
        })

        if (rows.length === count) {
            finished = true
        }
        const studentGrade = {
            "bueno": bueno,
            "excelente": excelente,
            "noaceptable": noaceptable,
            "endesarrollo": endesarrollo,
            "total": bueno + excelente + endesarrollo + noaceptable,
            "content": JSON.stringify(rows)
        }

        const competeceGrade = {
            "competenceRight": competenceRight,
            "competenceLeft": competenceLeft
        }

        setFinish(finished)
        RubricGradeSave(rows, rubricCode, courseCode, String(studentSelected), JSON.stringify(studentGrade), JSON.stringify(competeceGrade), finished).then((val) => {
            toast({
                title: "Se guardo la calificacion del alumno correctamente",
                status: "success",
                isClosable: true,
            })
        }).catch((err) => {
            toast({
                title: "We have a issue, try again please",
                status: "error",
                isClosable: true,
            })
        })

    }


    return (
        <>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Finalizar Calificar rubricas</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        ¿Estas seguro que ha terminado de calificar todas las rubricas?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={FinishGradeByStudent}>
                            Confirmar
                        </Button>
                        <Button colorScheme='red' variant="outline" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Header></Header>
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
                        <Heading>{"Calificar un curso"}</Heading>
                    </Box>
                </SimpleGrid>
                <Box mt={10}>
                    <Box mt={10}>
                        <Accordion allowToggle defaultIndex={[0]} mb={6}>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>

                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    <Grid templateColumns="repeat(6, 1fr)" gap={2}>
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
                                                <Text> {activity} </Text>
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
                                                <b> Criterio de <br /> desempeño </b>
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
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                        {

                            (isEditable ? <Grid templateColumns="repeat(5, 2fr)" gap={6}>
                                <Box></Box>
                                <Box></Box>
                                <Box></Box>

 
                                <Button onClick={GradeRubricByStudent} colorScheme='green' variant='outline'>Guardar</Button>
                                <Button onClick={onOpen} colorScheme='blue'>Finalizar</Button>

                            </Grid> : null)
                        }

                        {

                            (<Grid templateColumns="repeat(5, 2fr)" gap={6} mt={5}>
                                <Box>
                                    <Select placeholder='Selecciona una seccion' onChange={(e) => setSections(e.target.value)}>
                                        {
                                            rubricInformation?.sections?.map((val) => {
                                                return <option value={val} key={val}>{val}</option>
                                            })
                                        }
                                    </Select>
                                </Box>
                                <Box></Box>
                                <Box></Box>
                                <Box></Box>
                                <Box>
                                    <Select placeholder='Selecciona un alumno' onChange={(e) => setStudentSelected(e.target.value)}>
                                        {
                                            students?.map((val: Student) => {
                                                return <option value={val.studentCode} key={val.studentCode}>{val.studentName}</option>
                                            })
                                        }
                                    </Select>
                                </Box>
                            </Grid>)
                        }



                        <Box minH={500}>
                            <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={10} mb={3}>
                                <Box></Box>
                                <Box style={{ display: "flex", justifyContent: "center" }}>
                                    <Heading mb={5}> {title} </Heading>
                                </Box>

                            </Grid>
                            <HeaderRubric isFinished={finish} isEditable={false} hasMargins={true} />
                            {rows.map((row, index) => (
                                <Row
                                    onChange={(value) => handleOnChange(index, value)}
                                    {...row}
                                    isEditable={isEditable}
                                    i={index}
                                    hasMargins={true}
                                    key={index}
                                />
                            ))}
                        </Box>


                        <Grid templateColumns="repeat(5, 1fr)" gap={6} p={3} ml={20}>
                            <Box>
                                <Box w="100%">  <Text noOfLines={[1, 2, 3]}> Nota final: <b> {finalGrade} </b> </Text> </Box>
                            </Box>
                            <Box p={4} style={{ display: "flex", justifyContent: "center" }} backgroundColor="#F5F8FA" >
                                {excelente}
                            </Box>
                            <Box p={4} style={{ display: "flex", justifyContent: "center" }} backgroundColor="#F5F8FA" >
                                {bueno}
                            </Box>
                            <Box p={4} style={{ display: "flex", justifyContent: "center" }} backgroundColor="#F5F8FA" >
                                {endesarrollo}
                            </Box>
                            <Box p={4} style={{ display: "flex", justifyContent: "center" }} backgroundColor="#F5F8FA"  >
                                {noaceptable}
                            </Box>
                        </Grid>
                        <Grid templateColumns="repeat(5, 1fr)" gap={6} p={3} ml={20}>

                            <GridItem colStart={0}>
                                <Box w="100%">  <Text noOfLines={[1, 2, 3]}> Evaluación de la competencia </Text> </Box>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <Box p={4} style={{ display: "flex", justifyContent: "center" }} backgroundColor="#F5F8FA" >
                                    {competenceLeft}%
                                </Box>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <Box p={4} style={{ display: "flex", justifyContent: "center" }} backgroundColor="#F5F8FA" >
                                    {competenceRight}%
                                </Box>
                            </GridItem>
                        </Grid>

                    </Box>


                </Box>
            </Box>

        </>
    )
}