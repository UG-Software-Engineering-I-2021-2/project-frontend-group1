import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import { CoursesPage } from "../Courses/Courses";
import { LogOut } from "../LogOut/LogOut";

import { useAuth0 } from "@auth0/auth0-react"
import { useHistory } from "react-router";
import { Header } from "../../templates/header/header";
import { LoginApp } from "../../../api/ApiEndpoints";

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
