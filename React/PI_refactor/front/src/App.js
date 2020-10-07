import React from 'react';
import logo from './logo.svg';
import './App.css';
import Content from './components/Content';
import Contentc from './components/Contentc';
import Header from './components/Header';
import Footer from './components/Footer'
function App() {
  return (
    <div className="App">
      <Header />
      <Contentc />
      <Footer/>
    </div>
  );
}

export default App;
