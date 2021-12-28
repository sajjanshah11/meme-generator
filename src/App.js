import React from 'react';
import NewWeather from "./NewWeather";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";


const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path = "/" exact>
            <NewWeather />
          </Route>
          <Route path = "/signup" exact>
            <Signup />
          </Route>
          <Route path = "/login" exact>
            <Login />
          </Route>
        </Switch>
      </Router>
      
    </>
  );
}

export default App;
