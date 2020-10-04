import React from "react";


function Jumbotron() { 
  return (
    <div className="jumbotron">
      Jumbotron
    </div>
  );
}

function Header() {
  return (
    <div className="header-wrapper">
      Header
       <Jumbotron/>
    </div>
  );
}


export default Header;