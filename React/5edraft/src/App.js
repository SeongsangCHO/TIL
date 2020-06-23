import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import PageHeader from './component/PageHeader';
import Test from './component/Test';
import Content from './component/Content.js';

function App() {
  return (
    <div className="App">
      <PageHeader/>
      <Test id={'HELLO'}/>
      <Content/>

    </div>
  );
}

export default App;
