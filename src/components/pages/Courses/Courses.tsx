import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";

export const Courses = () => {

  //!important change this to interface 
  const [courses, setCourses] = useState([
    { nombre: "Programación", display: true },
    { nombre: "Matemáticas", display: true },
    { nombre: "Química", display: true },
    { nombre: "Ingeniería de Software", display: true },
  ]);
  const [courseFilter, setCourseFilter] = useState("");

  const courseInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setCourseFilter(name);

    courses.map((course) => {
      course.display = course.nombre.toLowerCase().includes(name.toLowerCase())
        ? true
        : false;
    });
  };

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

      {courses.map((course) => (
        <div
          style={{
            display: "flex",
            width: "100%",
            //border: "1px solid",
            justifyContent: "center",
          }}
        >
          {course.display ? (
            <Button
              borderRadius="20"
              padding="10"
              border="3px solid"
              borderColor="black"
              width="30%"
              marginBottom="5"
            >
              {course.nombre}
            </Button>
          ) : null}
        </div>
      ))}
    </>
  );
};
