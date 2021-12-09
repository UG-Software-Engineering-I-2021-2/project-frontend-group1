import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Login } from "./components/pages/Login/Login";
import { LogOut } from "./components/pages/LogOut/LogOut";
import { MainPage } from "./components/pages/Main/MainPage";
import { NotFoundUser } from "./components/pages/NotFound/NotFound"
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import IdleTimer from 'react-idle-timer'
import { RubricPage } from "./components/pages/Rubrics/Rubric";
import { CreateNewRubric } from "./components/pages/Rubrics/CreateRubric/CreateNewRubric";
import { GradeRubric } from "./components/pages/Rubrics/CalificateRubric/CalificateRubric";



const theme = extendTheme({
  colors: {
    brand: {
      white: "#f7fafc",
      // ...
      black: "#1a202c",
    },
  },
});

const App = () => {

  return (
    <ChakraProvider theme={theme}>
      <IdleTimer
        timeout={600000} //600000 logout the user after 10minutes if you want to change the value of idle time you will have to change timeout variable 
        onIdle={() => {
          localStorage.clear()
          window.location.href = window.location.origin + "/"
        }}
        debounce={250}
      />
      <BrowserRouter>
        <Switch>
          <Route exact path="/grade-rubric" render={(props) => <GradeRubric />} />
          <Route exact path="/edit-rubric" render={(props) => <CreateNewRubric />} />
          <Route exact path="/rubric" render={(props) => <RubricPage />} />
          <Route exact path="/not-found" render={(props) => <NotFoundUser />} />
          <Route exact path="/main" render={(props) => <MainPage></MainPage>} />
          <Route exact path="/login" render={(props) => <Login></Login>} />
          <Redirect from="/" to="/login" />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
