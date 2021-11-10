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

interface CoursesDisplayed extends Courses {
  color: string,
  display?: boolean
}


const CourseCard = (props: CoursesDisplayed) => {
  const history = useHistory()

  const setToRubric = (data: Courses) => {
    history.push(`/rubric?name=${data.name}&cod=${data.code}`)
  }

  console.log(props.color)
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" backgroundColor={props.color} onClick={() => setToRubric(props)} style={{ cursor: "pointer" }} _hover={{ opacity: "0.5" }}>
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
  const [courseFilter, setCourseFilter] = useState("");
  const [userCourse, setUserCourses] = useState<Array<CoursesDisplayed>>([{
    code: "",
    name: "",
    display: false,
    color: "",
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
      const coursesDisplayed = userCourses.map((val) => {
        return {
          "name": val.name,
          "code": val.code,
          "display": true,
          "color": getColor(),
        }
      })

      setUserCourses(coursesDisplayed)
      localStorage.setItem("courses", JSON.stringify(coursesDisplayed))

    }).catch((err) => {
      console.log(err)
    })
  }, [])



  const courseInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setCourseFilter(name);

    userCourse.map((course) => {
      course.display = course.name.toLowerCase().includes(name.toLowerCase()) || course.code.toLowerCase().includes(name.toLowerCase())
        ? true
        : false;
    });
  };

  return (
    <>
      <Box style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}>
        <Input
          flex="0.3"
          variant="outline"
          placeholder="Seleccionar curso"
          borderRadius="20"
          fontSize="20"
          padding="5"
          value={courseFilter}
          onChange={courseInputHandler}
        />
      </Box>
      <SimpleGrid columns={4} spacing={30} mt={50} ml={5}>
        {
          userCourse[0].code.length !== 0 ? userCourse?.map((val: CoursesDisplayed, i: number) => {
            return val.display ? <CourseCard key={i} color={val.color} name={val.name} code={val.code} ></CourseCard> : null
          }) : null
        }
      </SimpleGrid>
    </>
  );
};
