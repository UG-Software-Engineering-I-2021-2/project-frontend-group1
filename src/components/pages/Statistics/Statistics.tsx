import React, { useEffect, useState } from "react";
import { Box, Select, SimpleGrid, Grid, GridItem, Heading } from "@chakra-ui/react";
import { GetCareersStatistics, GetCompetencesByCareer, GetFirstStatistics } from "../../../api/ApiEndpoints";
import { Careers, StatisticsCareers, Statistics1, Stats } from "../../../interfaces/statistics";
import { Chart } from "react-google-charts";


export const Statistics = () => {
    const [filterCareersByStatus, setFilterCareersByStatus] = useState<string>("")
    const [careers, setCareers] = useState<Array<Careers>>([{ id: 0, name: "" }])

    const [competences, setCompetences] = useState<Array<{ code: string, description: string }>>([{ code: "", description: "" }])

    const [filterCompetence, setFilteredCompetence] = useState<string>("")

    const [description, setDescription] = useState<string>("")
    useEffect(() => {
        GetCareersStatistics().then((val: StatisticsCareers) => {
            setCareers(val.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const [stats1, setStats1] = useState<Array<Stats>>([{
        criteria: "",
        score: new Map()
    }])

    const [data, setData] = useState<Array<Array<string>>>([[]])

    useEffect(() => {

        GetCompetencesByCareer(filterCareersByStatus).then((val: { data: Array<{ code: string, description: string }> }) => {
            setCompetences(val.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [filterCareersByStatus])

    useEffect(() => {
        GetFirstStatistics(String(filterCompetence)).then((val: Statistics1) => {
            setStats1(val.data)
            const s = competences.filter((val) => { if (val.code === String(filterCompetence)) return val.description })
            setDescription(s[0]?.description)

            const totalData = new Array<Array<string>>()
            let columns = new Array<string>()
            columns.push(filterCompetence)
            columns.push("Nivel 1")
            columns.push("Nivel 2")
            columns.push("Nivel 3")
            totalData.push(columns)

            val.data.map((stat, i) => {
                columns = []
                columns.push(stat.criteria.substring(0, 4))
                columns.push(stat.score[1])
                columns.push(stat.score[2])
                columns.push(stat.score[3])
                totalData.push(columns)
            })

            setData(totalData)
        }).catch((err) => {
            console.log(err)
        })
    }, [filterCompetence])

    return (<Box p={5}>
        <SimpleGrid columns={5} padding={3} gap={3} ml={3} marginBottom={10}>
            <Box w={80} style={{ display: "flex", justifySelf: "flex-end" }}>

                <Select placeholder="Filtrar por carrera" value={filterCareersByStatus} onChange={(e) => setFilterCareersByStatus(e.target.value)}>
                    {
                        careers.map((val: Careers) => {
                            return <option key={val.id} value={val.id}>{val.name}</option>
                        })
                    }
                </Select>
            </Box>
            <Box w={80} >
                {
                    filterCareersByStatus ? (
                        <Select placeholder="Competencias" value={filterCompetence} onChange={(e) => setFilteredCompetence(e.target.value)} width={1200}>
                            {
                                competences.map((val) => {
                                    return <option key={val.code} value={val.code}>{val.code + " - " + val.description}</option>
                                })
                            }
                        </Select>

                    ) : null
                }
            </Box>

        </SimpleGrid>
        {filterCompetence ? <Box>
            <Box>
                <Grid
                    templateRows='repeat(4, 1fr)'
                    templateColumns='repeat(11, 1fr)'
                    gap={4}

                >
                    <GridItem rowStart={1} rowEnd={2} rowSpan={1} colStart={1} style={{ backgroundColor: "lightblue", display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "13px" }} >
                            <Heading size={"xs"}>
                                Resultados del estudiante
                            </Heading>
                        </Box>
                    </GridItem>
                    <GridItem rowStart={2} rowSpan={3} colStart={1} >
                        <Box>
                            {filterCompetence}
                        </Box>
                    </GridItem>

                    <GridItem rowStart={1} rowEnd={2} rowSpan={1} colStart={2} colSpan={2} style={{ backgroundColor: "lightblue", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "13px" }} >
                            <Heading size={"md"}>
                                Descripción
                            </Heading>
                        </Box>
                    </GridItem>
                    <GridItem rowStart={2} rowSpan={3} colStart={2} colSpan={2}>
                        <Box>
                            {description}
                        </Box>
                    </GridItem>

                    <GridItem rowStart={1} rowEnd={2} rowSpan={1} colStart={4} colSpan={3} style={{ backgroundColor: "lightblue", display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "13px" }} >
                            <Heading size={"md"}>
                                Descripción de los criterios de desempeño
                            </Heading>
                        </Box>
                    </GridItem>

                    <GridItem rowStart={1} rowEnd={2} rowSpan={1} colStart={7} style={{ backgroundColor: "lightblue", display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "13px" }} >
                            <Heading size={"md"}>
                                Meta
                            </Heading>
                        </Box>
                    </GridItem>

                    <GridItem rowStart={1} rowEnd={2} rowSpan={1} colStart={8} style={{ backgroundColor: "lightblue", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "13px" }} >
                            <Heading size={"md"}>
                                Nivel 1
                            </Heading>
                        </Box>
                    </GridItem>

                    <GridItem rowStart={1} rowEnd={2} rowSpan={1} colStart={9} style={{ backgroundColor: "lightblue", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "13px" }} >
                            <Heading size={"md"}>
                                Nivel 2
                            </Heading>
                        </Box>
                    </GridItem>

                    <GridItem rowStart={1} rowEnd={2} rowSpan={1} colStart={10} style={{ backgroundColor: "lightblue", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "13px" }} >
                            <Heading size={"md"}>
                                Nivel 3
                            </Heading>
                        </Box>
                    </GridItem>

                    <GridItem rowStart={1} rowEnd={2} rowSpan={1} colStart={11} style={{ backgroundColor: "lightblue", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "13px" }} >
                            <Heading size={"md"}>
                                Estado
                            </Heading>
                        </Box>
                    </GridItem>
                    <GridItem rowStart={2} rowSpan={3} colStart={4} colSpan={3} >
                        {
                            stats1.map((val) => {
                                return <Box minH={100} maxH={150} m={3}> {val.criteria} </Box>
                            })
                        }
                    </GridItem>

                    <GridItem rowStart={2} rowSpan={3} colStart={7} >
                        {
                            stats1.map((val) => {
                                return <Box minH={100} maxH={150} m={3} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} > {">= 75%"} </Box>
                            })
                        }
                    </GridItem>
                    <GridItem rowStart={2} rowSpan={3} colStart={8}>
                        {
                            stats1.map((val) => {
                                return <Box minH={100} maxH={150} m={3} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} backgroundColor={Number(val.score[1]) <= 50 ? "red.300" : val.score[1] >= 75 ? "green.300" : "yellow.300"} > {val.score[1] + "%"} </Box>
                            })
                        }
                    </GridItem>
                    <GridItem rowStart={2} rowSpan={3} colStart={9}>
                        {
                            stats1.map((val) => {
                                return <Box minH={100} maxH={150} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} m={3} backgroundColor={Number(val.score[2]) <= 50 ? "red.300" : val.score[2] >= 75 ? "green.300" : "yellow.300"} > {val.score[2] + "%"} </Box>
                            })
                        }
                    </GridItem>
                    <GridItem rowStart={2} rowSpan={3} colStart={10}>
                        {
                            stats1.map((val) => {
                                return <Box minH={100} maxH={150} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} m={3} backgroundColor={Number(val.score[3]) <= 50 ? "red.300" : val.score[3] >= 75 ? "green.300" : "yellow.300"} > {val.score[3] + "%"} </Box>
                            })
                        }
                    </GridItem>
                    <GridItem rowStart={2} rowSpan={3} colStart={11} >
                        {
                            stats1.map((val) => {
                                return <Box minH={100} maxH={150} m={3} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} > {"En proceso"} </Box>
                            })
                        }
                    </GridItem>

                </Grid>
            </Box>
            <br></br>
            <Box style={{display:"flex", justifyContent:"center"}} mt={5}>
                <Chart
                    width={'600px'}
                    height={'500px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={data}
                    options={{
                        colors: ['green', 'yellow', 'red'],
                        chart: {
                            title: 'Estadísticas',
                            subtitle: 'Niveles',
                        },
                        vAxis: {
                            maxValue: 100,
                        },
                        hAxis: {
                            title: 'Resultados',
                            minValue: 0,
                          },
                    }}

                />
            </Box>
        </Box> : null}
    </Box>)
}