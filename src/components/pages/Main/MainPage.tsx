import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { CoursesPage } from "../Courses/Courses";
import { Header } from "../../templates/header/header";

export const MainPage = () => {


  return (
    <>
      <Header></Header>
      <Tabs size="lg" variant="enclosed" isFitted>
        <TabList>
          <Tab>Cursos</Tab>
          <Tab>Estadísticas generales</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={4}>
            <CoursesPage />
          </TabPanel>
          <TabPanel>
            <p>Estadisticas generales</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
