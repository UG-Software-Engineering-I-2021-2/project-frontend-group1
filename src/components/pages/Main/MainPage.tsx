import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import { CoursesPage } from "../Courses/Courses";
import { LogOut } from "../LogOut/LogOut";

import { useAuth0 } from "@auth0/auth0-react"
import { useHistory } from "react-router";
import { Header } from "../../templates/header/header";
import { LoginApp } from "../../../api/ApiEndpoints";

export const MainPage = () => {
  const { isAuthenticated, user, getIdTokenClaims  } = useAuth0();
  const history = useHistory()

  useEffect(() => {
    if (user) {
      const indexOf = user.email?.indexOf("@")
      if (indexOf && user.email?.substr(indexOf) !== "@utec.edu.pe") {
        history.push("/not-found")
      }else {
        localStorage.setItem("user", JSON.stringify(user))
      }
    }

    getIdTokenClaims().then((val) => {
      console.log(val.__raw)

        
      LoginApp(val.email, val.__raw).then((newval) => {
        console.log("Response ", newval)
      }).catch((err) => {
        console.log(err)
      })
    })
  }, [user])

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
