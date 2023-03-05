// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navigation from "../src/Components/Shared/Navigation/Navigation";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Navigation></Navigation>
      <Switch>
        <Route path="/" exact>
          <Home></Home>
        </Route>

        <Route path="/register" exact>
          <Register></Register>
        </Route>

        <Route path="/login" exact>
          <Login></Login>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
