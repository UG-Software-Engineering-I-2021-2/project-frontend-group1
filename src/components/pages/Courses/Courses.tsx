import React, { useEffect, useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { GetCourses } from "../../../api/ApiEndpoints";

interface course {
  name: string;
  display: boolean;
}

export const CoursesPage = () => {
  const history = useHistory()

  useEffect(()=>{
    GetCourses().then((val) => {
      console.log(val)
    }).catch((err) => {
      console.log(err)
    })
  })

  const [courses, setCourses] = useState<Array<course>>([
    { name: "Matemática", display: true },
    { name: "Programación", display: true },
    { name: "Química", display: true },
    { name: "Física", display: true },
    { name: "Letras", display: true },
  ]);
  const [courseFilter, setCourseFilter] = useState("");

  const courseInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setCourseFilter(name);

    courses.map((course) => {
      course.display = course.name.toLowerCase().includes(name.toLowerCase())
        ? true
        : false;
    });
  };

  const setCourse = (courseName: string) => {
    history.push(`/rubric?course=${courseName}`)
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //border: "1px solid",
          padding: "50px",
          marginBottom: "10",
        }}
      >
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
      </div>

      {courses.map((item: course) => (
        <div
          style={{
            display: "flex",
            width: "100%",
            //border: "1px solid",
            justifyContent: "center",
          }}
        >
          {item.display ? (
            <Button
              borderRadius="20"
              padding="10"
              border="3px solid"
              onClick={()=>setCourse(item.name)}
              borderColor="black"
              width="30%"
              marginBottom="5"
            >
              {item.name}
            </Button>
          ) : null}
        </div>
      ))}
    </>
  );
};
