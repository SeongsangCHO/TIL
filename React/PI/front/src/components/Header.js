import React, { Component } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import "./css/Header.css";
import Jumbotron from "./Jumbotron";

function Header() {
  return (
    <div className="header-wrapper">
      <div className="header-content">
        <a>Link for you</a>
        <Button type="primary">회원가입/ 로그인</Button>
      </div>
      <Jumbotron />
    </div>
  );
}
export default Header;
