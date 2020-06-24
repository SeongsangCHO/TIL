import React from 'react';
import '../css/header.css';
import RightUpSide from './RightUpSide';
import Logo from './Logo';
import ScheduleBar from './ScheduleBar';
import ScheduleBarUI from './ScheduleBarUI';

function PageHeader() {
    return(
        <div className="PageHeader">
            <Logo/>
            <RightUpSide/>
            <ScheduleBar/>
            
        </div>
    );
}

export default PageHeader;