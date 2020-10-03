import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Contents from "./components/Contents";

import Header from "./components/Header";
import Content from "./components/Content";
import SideContent from "./components/SideContent";

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <SideContent />
    </div>
  );
}

export default App;
