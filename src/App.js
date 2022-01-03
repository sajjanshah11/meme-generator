import React from 'react';
import NewWeather from "./NewWeather";
import Login from "./Login";
import Signup from "./Signup";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";




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
