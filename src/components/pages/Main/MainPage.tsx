import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react"

export const MainPage = () => {
    
    return (
        <>
        <Box >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Utec-logo.jpg" style={{marginBottom:"20px"}} width="150" height="200"></img>
        </Box>
        <Tabs size="lg" variant="enclosed" isFitted>
            <TabList >
                <Tab>Cursos</Tab>
                <Tab>Estadisticas generales</Tab>
            </TabList>

            <TabPanels>
                <TabPanel p={4}>
                    <p>Courses</p>
                </TabPanel>
                <TabPanel>
                    <p>Estadisticas generales</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
        </>
    )
}