import React from 'react';
import '../css/header.css'
function ScheduleBar(){
    return(
        <div className="ScheduleBar">
            <button>부트캠프일정</button>
            <button>해커톤 일정</button>
            <button>컨퍼런스 일정</button>
            <button>감자튀김</button>
            <button>참여자후기</button>
        </div>
    );
}

export default ScheduleBar;