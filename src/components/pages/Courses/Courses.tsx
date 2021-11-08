import React, { useEffect, useState } from "react";
import { Input, Button, SimpleGrid, Box } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { GetCourses } from "../../../api/ApiEndpoints";
import { CoursesResponse } from "../../../interfaces/courses";


interface Courses {
  name: string,
  cod_course: string
}

interface CourseCard extends Courses {
  image: string,
  issue_date: string,
}

// const CourseCard = (props: ) => {
//   return (  <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
//   <Image src={property.imageUrl} alt={property.imageAlt} />

//   <Box p="6">
//     <Box display="flex" alignItems="baseline">
//       <Badge borderRadius="full" px="2" colorScheme="teal">
//         New
//       </Badge>
//       <Box
//         color="gray.500"
//         fontWeight="semibold"
//         letterSpacing="wide"
//         fontSize="xs"
//         textTransform="uppercase"
//         ml="2"
//       >
//         {property.beds} beds &bull; {property.baths} baths
//       </Box>
//     </Box>

//     <Box
//       mt="1"
//       fontWeight="semibold"
//       as="h4"
//       lineHeight="tight"
//       isTruncated
//     >
//       {property.title}
//     </Box>

//     <Box>
//       {property.formattedPrice}
//       <Box as="span" color="gray.600" fontSize="sm">
//         / wk
//       </Box>
//     </Box>

//     <Box display="flex" mt="2" alignItems="center">
//       {Array(5)
//         .fill("")
//         .map((_, i) => (
//           <StarIcon
//             key={i}
//             color={i < property.rating ? "teal.500" : "gray.300"}
//           />
//         ))}
//       <Box as="span" ml="2" color="gray.600" fontSize="sm">
//         {property.reviewCount} reviews
//       </Box>
//     </Box>
//   </Box>
// </Box>)
// }

export const CoursesPage = () => {
  const history = useHistory()
  const [userCourse, setUserCourses] = useState<Array<Courses>>([])

  useEffect(() => {
    GetCourses().then((val: CoursesResponse) => {
      const courses = new Map(Object.entries(val.data));
      const userCourses = new Array<Courses>();
console.log(courses)
      //@ts-ignore
      Array.from(courses.entries()).map(([x, y]) => {
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
      <SimpleGrid columns={4} spacing={30} mt={100} ml={5}>
        {
          userCourse.map((val: Courses) => {
            return <Box>{val.name} {val.cod_course}</Box>
          })
        }

      </SimpleGrid>
    </>
  );
};
