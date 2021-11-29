import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { Header } from "../../templates/header/header";
import {
  Box,
  Heading,
  Button,
  SimpleGrid,
  chakra,
  Center,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GetRubrics } from "../../../api/ApiEndpoints";
import {
  Rubric,
  RubricResponse,
  GetColorByRubricState,
} from "../../../interfaces/rubric";

const RubricCard = (props: { data: Rubric, course: string,courseCode: string }) => {
  const history = useHistory();

  const clickCreateRubric = () => {
    if (props.data.canEdit) {
      history.push(`/edit-rubric?code=${props.data.code}&course=${props.course}&courseCode=${props.courseCode}`);
    }
  }

  return (
    <Flex p={50}>
      <Box
        _hover={{ cursor: `${props.data.canEdit ? "pointer" : "not-allowed"}` }}
        mx="auto"
        minW={[300, 500, 700]}
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        onClick={() => clickCreateRubric()}
        bg={useColorModeValue("white", "gray.800")}
        maxW="2xl"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color={props.data.state === "Fuera de fecha" ? "#FF8F7D" : useColorModeValue("gray.600", "gray.400")}
          >
            {props.data.state === "Fuera de fecha" ? "Out of date" : "Final date"} {props.data.date}
          </chakra.span>
          <Box
            px={3}
            py={1}
            bg={GetColorByRubricState(props.data.state)}
            color="gray.100"
            fontSize="sm"
            fontWeight="700"
            rounded="md"
          >
            {props.data.state}
          </Box>
        </Flex>

        <Box mt={2}>
          <Box color={useColorModeValue("gray.700", "white")}>
            <Heading size="lg">Titulo: {props.data.title || "No defined"}</Heading>
            <Heading size="lg">Evaluacion: {props.data.evaluation}</Heading>
            <Heading size="md">Competencia: {props.data.competenceCode}</Heading>
            <Heading size="sm">Criterio de desempeño: {props.data.criteriaCode} nivel {props.data.level}</Heading>
            <Heading size="sm">Evidencia: {props.data.evidence}</Heading>
            <Heading size="sm">Total estudiantes: {props.data.students}</Heading>
          </Box>
          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")} minH={120}>
            {props.data.activity}
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Box color={useColorModeValue("brand.600", "brand.400")}>
            {props.data.code}
          </Box>

          <Flex alignItems="center">
            <Box
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
            >
              {props.data.week}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export const NotFoundRubrics = () => {
  return <Center>
    <Heading>
      No se encontrar las rubricas para este curso
    </Heading>
  </Center>
}

export const RubricPage = () => {
  const history = useHistory();
  const { search } = useLocation();
  const [course, setCourse] = useState(queryString.parse(search).name);
  const [code, setCode] = useState(queryString.parse(search).cod);
  const [rubrik, setRubric] = useState<Array<Rubric | null>>([]);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    GetRubrics(code)
      .then((val: any) => {
        console.log(val)
        const userRubric = val.data;
        setLoading(false)
        setRubric(userRubric);
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  }, []);

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
            <Heading>{course}</Heading>
          </Box>
        </SimpleGrid>
        <Box mt={10}>
          <SimpleGrid columns={[1, 2]} spacing={10} overflow="scroll" maxH={600}>
            {
              rubrik && rubrik.length > 0 ? (
                //@ts-ignore
                rubrik.map((val: Rubric, i: number) => {
                  //@ts-ignore
                  return <RubricCard key={i} data={val} course={course} courseCode={code}>   </RubricCard>
                })
              ) : loading ? <></> : <NotFoundRubrics />
            }
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};
