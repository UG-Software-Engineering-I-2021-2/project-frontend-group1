import React, { useEffect, useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { GetCourses } from "../../../api/ApiEndpoints";
import { CoursesResponse } from "../../../interfaces/courses";

interface course {
  name: string;
  display: boolean;
}

interface Courses {
  name: string,
  cod_course: string
}

export const CoursesPage = () => {
  const history = useHistory()
  const [userCourse, setUserCourses] = useState<Array<Courses>>([])

  useEffect(()=>{
    GetCourses().then((val: CoursesResponse) => {
      const courses = new Map(Object.entries(val.data));
      const userCourses = new Array<Courses>();

      //@ts-ignore
      Array.from(courses.entries()).map(([x,y]) => {
        userCourses.push({
          name: y,
          cod_course: x
        })
      })

      setUserCourses(userCourses)

    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <>
      
    </>
  );
};
