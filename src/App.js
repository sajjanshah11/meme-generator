import React from 'react';
import NewWeather from "./NewWeather";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
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
          <Route exact path = "/" >
            <Login />
          </Route>
          <Route  path = "/main" >
            <NewWeather />
          </Route>
          <Route path = "/signup" >
            <Signup />
          </Route>
        </Switch>

      </Router>
      
    </>
  );
}

export default App;
