import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Contents from "./components/Contents";
import Header from "./components/Header";
import Content from "./components/Content";

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default App;
