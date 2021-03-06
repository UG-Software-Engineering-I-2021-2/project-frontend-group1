import React, { useEffect, useState } from "react";
import { Input, SimpleGrid, Box, Badge, Select } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { GetCourses } from "../../../api/ApiEndpoints";
import { Courses, CoursesResponse, CoursesDisplayed } from "../../../interfaces/courses";
import { GetRubric } from "../../../interfaces/rubric";


const getColor = (): string => {
  return "hsl(" + 360 * Math.random() + ',' +
    (25 + 70 * Math.random()) + '%,' +
    (85 + 10 * Math.random()) + '%)'
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

    GetCourses().then((res: CoursesResponse) => {
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
          <Select placeholder="Filtrar por carrera" value={filterCareers} onChange={(e) => FilterCareers(e.target.value)}>
            <option value='Ingenier??a Electr??nica'>Ingenier??a Electr??nica</option>
            <option value='Ingenier??a Mec??nica'>Ingenier??a Mec??nica</option>
            <option value='Ciencia de la Computaci??n'>Ciencia de la Computaci??n</option>
            <option value='Administraci??n & Negocios Digitales'>Administraci??n & Negocios Digitales</option>
            <option value='Ingenier??a Civil'>Ingenier??a Civil</option>
            <option value='Ingenier??a de la Energ??a'>Ingenier??a de la Energ??a</option>
            <option value='Ingenier??a Mecatr??nica'>Ingenier??a Mecatr??nica</option>
            <option value='Ingenier??a Ambiental'>Ingenier??a Ambiental</option>
            <option value='Bioingenier??a'>Bioingenier??a</option>
            <option value='Ingenier??a Qu??mica'>Ingenier??a Qu??mica</option>
            <option value='Ciencia de Datos'>Ciencia de Datos</option>
            <option value='Ingenier??a Industrial'>Ingenier??a Industrial</option>
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

          <Select placeholder="Filtrar por estado" value={filterCareersByStatus} onChange={(e) => filterStatusHandler(e.target.value)}>
            <option value="Aprobacion pendiente">Aprobaci??n pendiente</option>
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
