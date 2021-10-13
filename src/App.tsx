import React, {useEffect} from "react"
import { useAuth0 } from "@auth0/auth0-react";

import { Login } from "./components/pages/Login/Login";
import { LogOut } from "./components/pages/LogOut/LogOut";
import { MainPage } from "./components/pages/Main/MainPage";
import { BrowserRouter, Route, Switch, Redirect,useHistory } from "react-router-dom";


const App = () => {


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/main" render={props => <MainPage ></MainPage>} />
        <Route exact path="/login" render={props => <Login ></Login>} />
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
