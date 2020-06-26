import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import PageHeader from './component/PageHeader';
import Test from './component/Test';
import Content from './component/Content.js';
import DetailCard from './component/DetailCard';
import { TabScrollButton } from '@material-ui/core';
import ScheduleBarUI from './component/ScheduleBarUI';
function App() {
  return (
    <div className="App">
      <PageHeader/>
      <Test id={'HELLO'}/>
      <Content/>
      <div>
        <ScheduleBarUI/>
      </div>
    </div>
  );
}

export default App;
