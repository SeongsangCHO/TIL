import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Content from "./components/Content";
import Contentc from "./components/Contentc";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path={"/"} component={Contentc}></Route>
        <Route path={"/register"} component={Register}/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
