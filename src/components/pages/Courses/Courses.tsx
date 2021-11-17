import React, { useEffect, useState } from "react";
import { Input, SimpleGrid, Box, Badge, Select } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { GetCourses } from "../../../api/ApiEndpoints";
import { Courses, CoursesResponse } from "../../../interfaces/courses";
import { GetRubric } from "../../../interfaces/rubric";


const getColor = (): string => {
  return "hsl(" + 360 * Math.random() + ',' +
    (25 + 70 * Math.random()) + '%,' +
    (85 + 10 * Math.random()) + '%)'
}

interface CoursesDisplayed extends Courses {
  color: string,
  display?: boolean
}


const CourseCard = (props: { data: CoursesDisplayed }) => {
  const history = useHistory()

  const setToRubric = (data: Courses) => {
    history.push(`/rubric?name=${data.name}&cod=${data.code}`)
  }

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" backgroundColor={props.data.color} onClick={() => setToRubric(props.data)} style={{ cursor: "pointer" }} _hover={{ opacity: "0.5" }}>
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            Curso
          </Badge>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {props.data.name}
        </Box>
        <Box>
          {props.data.code}
        </Box>
      </Box>
    </Box>)
}

export const CoursesPage = () => {
  const [courseFilter, setCourseFilter] = useState<string>("");
  const [filterCareers, setFilterCareers] = useState("Select option");
  const [filterCareersByStatus, setFilterCareersByStatus]  = useState("Select option");
  const [userCourse, setUserCourses] = useState<Array<CoursesDisplayed>>([{
    code: "",
    name: "",
    display: false,
    color: "",
    careers: [],
    nState: {
      "Aprobacion pendiente": 0,
      "Cumplidos": 0,
      "Disponible para calificar": 0,
      "Fuera de fecha": 0,
      "Sin asignar": 0
    }
  }])

  useEffect(() => {

    const rawCourse = localStorage.getItem("courses")
    if (rawCourse && rawCourse?.length !== 0) {
      const parsedCourse = JSON.parse(rawCourse)
      setUserCourses(parsedCourse)
      return
    }

    GetCourses().then((res: any) => {
      console.log(res)
      const userCourses = res.data
      const coursesDisplayed = userCourses.map((val: CoursesDisplayed) => {
        return {
          "name": val.name,
          "code": val.code,
          "display": true,
          "color": getColor(),
          "careers": val.careers,
          "nState": val.nState
        }
      })

      setUserCourses(coursesDisplayed)
      localStorage.setItem("courses", JSON.stringify(coursesDisplayed))

    }).catch((err) => {
      console.log(err)
    })
  }, [])


  const FilterCareers = (value: string) => {
    setCourseFilter("");
    userCourse.map((course: CoursesDisplayed) => {
      const exist = course.careers.find((val) => val.includes(value));
      if (exist) {
        course.display = true
      } else {
        course.display = false
      }
      return course
    });
    setFilterCareers(value)
    setUserCourses([...userCourse])
  }

  const filterStatusHandler = (status: string) => {
    setCourseFilter("");

    userCourse.map((course) => {
      if (course.nState[status] > 0 || !status) {
        course.display = true
      } else {
        course.display = false
      }
    })
    setFilterCareersByStatus(status)
    setUserCourses([...userCourse])
  }

  const courseInputHandler = (name: string) => {
    setCourseFilter(name);

    userCourse.map((course) => {
      course.display = course.name.toLowerCase().includes(name.toLowerCase()) || course.code.toLowerCase().includes(name.toLowerCase())
        ? true
        : false;
    });
    setFilterCareers("Select option")
  };

  return (
    <>
      <SimpleGrid columns={3} padding={20} >

        <Box w={80} >
          <Select placeholder="Filter by career" value={filterCareers} onChange={(e) => FilterCareers(e.target.value)}>
            <option value='Ingeniería Electrónica'>Ingeniería Electrónica</option>
            <option value='Ingeniería Mecánica'>Ingeniería Mecánica</option>
            <option value='Ciencia de la Computación'>Ciencia de la Computación</option>
            <option value='Administración & Negocios Digitales'>Administración & Negocios Digitales</option>
            <option value='Ingeniería Civil'>Ingeniería Civil</option>
            <option value='Ingeniería de la Energía'>Ingeniería de la Energía</option>
            <option value='Ingeniería Mecatrónica'>Ingeniería Mecatrónica</option>
            <option value='Ingeniería Ambiental'>Ingeniería Ambiental</option>
            <option value='Bioingeniería'>Bioingeniería</option>
            <option value='Ingeniería Química'>Ingeniería Química</option>
            <option value='Ciencia de Datos'>Ciencia de Datos</option>
            <option value='Ingeniería Industrial'>Ingeniería Industrial</option>
          </Select>
        </Box>
        <Box >

          <Input
            flex="0.3"
            variant="outline"
            placeholder="Seleccionar curso"
            borderRadius="20"
            fontSize="20"
            padding="5"
            value={courseFilter}
            onChange={(e) => courseInputHandler(e.target.value)}
          />
        </Box>
        <Box w={80} style={{display:"flex", justifySelf:"flex-end"}}>

          <Select placeholder="Filter by status" value={filterCareersByStatus} onChange={(e) => filterStatusHandler(e.target.value)}>
            <option value="Aprobacion pendiente">Aprobacion pendiente</option>
            <option value="Cumplidos">Cumplidos</option>
            <option value="Disponible para calificar">Disponible para calificar</option>
            <option value="Fuera de fecha">Fuera de fecha</option>
            <option value="Sin asignar">Sin asignar</option>
          </Select>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={4} spacing={30} mt={50} ml={5}>
        {
          userCourse[0].code.length !== 0 ? userCourse?.map((val: CoursesDisplayed, i: number) => {
            return val.display ? <CourseCard key={i} data={val} ></CourseCard> : null
          }) : null
        }
      </SimpleGrid>
    </>
  );
};
