import React from 'react';
import '../css/material.css';
import BtnDefault from './BtnDefault';
function RightUpSide (){
    return(
        <div className="RightUpSide">
            <input type="text" placeholder="검색하삼"></input>
            <button>검색</button>
            <BtnDefault value={'로그인'}/>
            <button className="BtnFillBlue">회원가입</button>
        </div>
    );
}

export default RightUpSide;