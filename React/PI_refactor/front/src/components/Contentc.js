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
import "./css/Contentc.css";

const dummy =
  //사용자가 추가할 category
  {
    category: [
      {
        생필품: [
          {
            title: "생수",
            link: "생수 링크",
            price: "생수 가격",
            크롤링데이터: {
              크롤링제목: "생수 크롤링제목",
              크롤링링크: "생수 크롤링 링크",
              크롤링가격: "생수 크롤링가격",
            },
          },
          {
            title: "탄산수",
            link: "탄산수 링크",
            price: "탄산수  가격",
            크롤링데이터: {
              크롤링제목: "탄산수 크롤링제목",
              크롤링링크: "탄산수 크롤링 링크",
              크롤링가격: "탄산수 크롤링가격",
            },
          },
        ],
      },
      {
        옷: [
          {
            title: "후드티",
            link: "후드티 링크",
            price: "후드티 가격",
            크롤링데이터: {
              크롤링제목: "후드티 크롤링제목",
              크롤링링크: "후드티 크롤링 링크",
              크롤링가격: "후드티 크롤링가격",
            },
          },
          {
            title: "자켓",
            link: "자켓 링크",
            price: "자켓  가격",
            크롤링데이터: {
              크롤링제목: "자켓 크롤링제목",
              크롤링링크: "자켓 크롤링 링크",
              크롤링가격: "자켓 크롤링가격",
            },
          },
        ],
      },
    ],
  };

function CategoryTab() {
  return (
    <Nav variant="pills" className="flex-column">
      {dummy.category.map((cate, idx) => (
        <Nav.Item>
          <Nav.Link eventKey={Object.keys(cate)}>{Object.keys(cate)}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

function CrawlingCard({ obj }) {
  return (
    <>
      {obj[Object.keys(obj)]?.map((element, id) => (
        <Tab.Pane eventKey={element.title} key={element.title}>
          <div>{element.크롤링데이터.크롤링제목}</div>
        </Tab.Pane>
      ))}
    </>
  );
}

function CardTab({ obj }) {
  return (
    <>
      <Tab.Container>
        <Nav variant="pills" className="flex-column">
          <Tab.Content>
            {obj[Object.keys(obj)]?.map((element) => (
              <Nav.Item>
                <Nav.Link eventKey={element.title}>{element.title}</Nav.Link>
              </Nav.Item>
            ))}
            <CrawlingCard obj={obj} />
          </Tab.Content>
        </Nav>
      </Tab.Container>
    </>
  );
}
function LinkCard() {
  return (
    <Tab.Content defaultActiveKey="0">
      {dummy?.category?.map((cate, idx) => (
        <Tab.Pane eventKey={Object.keys(cate)} key={idx}>
          <CardTab obj={cate} />
        </Tab.Pane>
      ))}
      <Tab.Pane eventKey="second">b</Tab.Pane>
    </Tab.Content>
  );
}
function Contentc() {
  return (
    <div className="content-wrapper">
      <Tab.Container id="left-tabs" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <CategoryTab />
          </Col>
          <Col sm={9}>
            <LinkCard />
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default Contentc;
