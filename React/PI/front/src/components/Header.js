import React, { Component } from "react";
import { Button } from "antd";
import "antd/dist/antd.css"


function Header() {
  return (
    <div className="header-wrapper">
      헤더부분
      <Button type="primary">Button</Button>
    </div>
  );
}
export default Header;
