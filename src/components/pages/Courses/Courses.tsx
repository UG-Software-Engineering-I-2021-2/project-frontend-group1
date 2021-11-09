import React, { useEffect, useState } from "react";
import { Input, Button, SimpleGrid, Box, Badge } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { GetCourses } from "../../../api/ApiEndpoints";
import { CoursesResponse, Courses } from "../../../interfaces/courses";


const getColor = (): string => {
  return "hsl(" + 360 * Math.random() + ',' +
    (25 + 70 * Math.random()) + '%,' +
    (85 + 10 * Math.random()) + '%)'
}


const CourseCard = (props: Courses) => {
  const history = useHistory()

  const setToRubric = (data: Courses) => {
    history.push(`/rubric?name=${data.name}&cod=${data.code}`)
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
          {props.code}
        </Box>
      </Box>
    </Box>)
}

export const CoursesPage = () => {
  const [userCourse, setUserCourses] = useState<Array<Courses>>([{
    code: "",
    name: ""
  }])

  useEffect(() => {

    const rawCourse = localStorage.getItem("courses")
    if (rawCourse && rawCourse?.length !== 0) {
      const parsedCourse = JSON.parse(rawCourse)
      setUserCourses(parsedCourse)
      return
    }

    GetCourses().then((val: CoursesResponse) => {
      const userCourses = val.data
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
          userCourse[0].code.length !== 0 ?  userCourse?.map((val: Courses, i: number) => {
            return <CourseCard key={i} name={val.name} code={val.code}></CourseCard>
          }) : null
        }
      </SimpleGrid>
    </>
  );
};
