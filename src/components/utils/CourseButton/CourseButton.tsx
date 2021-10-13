import { Button } from "@chakra-ui/button";
import React from "react";

function buttonAction() {
  alert("name");
}

export const CourseButton = (props: { course: string; color: string }) => {
  const { course, color } = props;

  return (
    <Button
      background={color}
      textColor="white"
      borderRadius="20"
      padding="10"
      border="3px solid"
      borderColor="black"
      width="20%"
      onClick={buttonAction}
    >
      {course}
    </Button>
  );
};
