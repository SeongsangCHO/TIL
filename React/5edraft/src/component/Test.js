import React, { useState, useEffect } from 'react';


function Test(props){
    const [id] = useState('');

    useEffect(()=>{
      console.log(props); 
    })
    return(
        <div id={props.id}>
            대충 안녕이라는 이름을 가짐.
        </div>
    );
}

export default Test;
