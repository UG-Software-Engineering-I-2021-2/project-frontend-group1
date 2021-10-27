import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import { CoursesPage } from "../Courses/Courses";
import { LogOut } from "../LogOut/LogOut";

export const MainPage = () => {
  return (
    <>
      <Box>
        <div style={{ display: "flex" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Utec-logo.jpg"
            style={{ marginBottom: "20px" }}
            width="150"
            height="200"
          ></img>
          <div
            style={{
              display: "flex",
              alignItems: "begin",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <LogOut />
          </div>
        </div>
      </Box>
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
