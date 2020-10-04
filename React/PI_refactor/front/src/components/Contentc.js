import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import TabContainer from "react-bootstrap/TabContainer";
import "./css/Content.css";

const dummy = [
  {
    생필품: [
      {
        음료수: {
          link: "naver",
          price: "3000",
          info: "걍 정보,,",
          크롤링데이터: {
            link: "크롤링네이버",
            price: "크롤링가갹",
            info: "크롤링정보",
          },
        },
        탄산수: {
          link: "쿠팡",
          price: "50050",
          info: "더미데이터의 중요성",
          크롤링데이터: {
            link: "크롤링탄산수",
            price: "크롤링탄산수가격",
            info: "크롤링탄산수정보",
          },
        },
      },
    ],
    옷: [
      {
        후드티: {
          link: "더미데이터 ㅠㅠ",
          price: "억만금을 줘야해",
          info: "그치..?",
        },
        패딩: {
          link: "패딩스",
          price: "백원",
          info: "좋음",
        },
      },
    ],
  },
];


function Contentc() {
  return (
    <div>
      다시짜자
    </div>
  );
}

export default Contentc;
