import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Contents from "./components/Contents";

import Header from "./components/Header";
import Content from "./components/Content";
import Sidecontent from "./components/Sidecontent";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="body-wrapper">
        <Content/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
