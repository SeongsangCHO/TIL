import React, { useState, useEffect } from 'react';


function Test(props){
    const [id] = useState('');

    useEffect(()=>{
      console.log(props); 
    })
    return(
        <div id={props.id} style={{textAlign: 'center'}}>
            함수형 컴포넌트 props 값 변경
        </div>
    );
}

export default Test;
