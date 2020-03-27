import React from "react";
import {Link, Route} from "react-router-dom"; 

import HomePage from "./components/Home"; 
import PizzaForm from "./components/PizzaForm"; 

const App = () => {
  return (
    <div>
      <nav>
        <h1>Lambda Eats</h1>
        <Link to="/">Go Home</Link><br/>
      </nav>

      <Route exact path="/">
        <HomePage/>
      </Route>

      <Route path="/pizza">
        <PizzaForm/>
      </Route>
    </div>

  );
};
export default App;
