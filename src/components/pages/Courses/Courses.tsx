import React, { useEffect, useState } from "react";
import { Input, Button, SimpleGrid, Box, Badge } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { GetCourses } from "../../../api/ApiEndpoints";
import { CoursesResponse } from "../../../interfaces/courses";


interface Courses {
  name: string,
  cod_course: string
}


const getColor = (): string => { 
  return "hsl(" + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (85 + 10 * Math.random()) + '%)'
}


const CourseCard = (props: Courses) => {
  const history = useHistory()

  const setToRubric = (data: Courses) => {
    history.push(`/rubric?name=${data.name}&cod=${data.cod_course}`)
  }

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" backgroundColor={getColor()} onClick={() => setToRubric(props)}>
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
          {props.name}
        </Box>
        <Box>
          {props.cod_course}
        </Box>
      </Box>
    </Box>)
}

export const CoursesPage = () => {
  const history = useHistory()
  const [userCourse, setUserCourses] = useState<Array<Courses>>([])

  useEffect(() => {
    GetCourses().then((val: CoursesResponse) => {
      const courses = new Map(Object.entries(val.data));
      const userCourses = new Array<Courses>();
      //@ts-ignore
      Array.from(courses.entries()).map(([x, y]) => {
        userCourses.push({
          name: y,
          cod_course: x
        })
      })

      setUserCourses(userCourses)
      localStorage.setItem("courses", JSON.stringify(userCourses))
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <>
      <SimpleGrid columns={4} spacing={30} mt={100} ml={5}>
        {
          userCourse.map((val: Courses) => {
            return <CourseCard  name={val.name} cod_course={val.cod_course}></CourseCard>
          })
        }
      </SimpleGrid>
    </>
  );
};
