import React from 'react';
import logo from './logo.svg';
import './App.css';
import Content from './components/Content';
import Header from './components/Header';
import Footer from './components/Footer'
function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer/>
    </div>
  );
}

export default App;
