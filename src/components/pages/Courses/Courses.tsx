import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { CourseButton } from "../../utils/CourseButton/CourseButton";

var cursos = [
  "Ingeniería de Software",
  "Base de Datos",
  "Proyecto Interdisciplinario",
];
var cursos2 = [
  "Desarrollo de Software",
  "Programación competitiva",
  "Programación 1",
];
var colors = ["green", "blue", "brown", "grey", "orange", "red", "pink"];

export const Courses = () => {
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
        />
      </div>

      <div
        style={{
          display: "flex",
          //border: "1px solid",
          width: "100%",
          height: "100%",
          justifyContent: "space-around",
          padding: "40px",
        }}
      >
        {cursos.map((item) => (
          <CourseButton
            course={item}
            color={colors[Math.floor(Math.random() * colors.length)]}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          //border: "1px solid",
          width: "100%",
          height: "100%",
          justifyContent: "space-around",
          padding: "40px",
        }}
      >
        {cursos2.map((item) => (
          <CourseButton
            course={item}
            color={colors[Math.floor(Math.random() * colors.length)]}
          />
        ))}
      </div>
    </>
  );
};
