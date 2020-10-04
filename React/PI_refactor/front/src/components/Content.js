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
import './Content.css'

const categoryList = [
  {
    id: 1,
    title: "생필품",
  },
  {
    id: 2,
    title: "옷",
  },
  {
    id: 3,
    title: "강의",
  },
];

const linkList = [
  {
    생필품: [
      {
        id: 1,
        title: "음료수",
        link: "naver.com",
        price: "3000",
        info: "그냥 추가정보",
      },
      {
        id: 2,
        title: "탄산수",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
      {
        id: 3,
        title: "쌀",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
      {
        id: 4,
        title: "샴푸",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
      {
        id: 5,
        title: "고기",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
      {
        id: 6,
        title: "햇반",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
      {
        id: 7,
        title: "고무",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
    ],
  },
  {
    옷가지: [
      {
        id: 1,
        title: "옷",
        link: "naver.com",
        price: "3000",
        info: "그냥 추가정보",
      },
      {
        id: 2,
        title: "후드티",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
    ],
  },
];

//styled component color은 hex code
const ContentWrapper = styled.div`
  display: flex;
  background: #fff;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 4;
  background: #fff;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const RightSection = styled.div`
  flex: 1;
  background: #00bb00;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const TabWrapper = styled.div`
  display: flex;
`;
// grid-template-columns: 1fr 1fr 1fr;

const LinkCardWrapper = styled.div`
  flex: 1;
`;
function CategoryTab() {
  return (
    <Nav variant="pills" className="flex-column">
      {categoryList?.map((v, idx) => (
        <Nav.Item>
          <Nav.Link eventKey={idx}>{v.title}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

const CardTest = styled.div`
  display: inline;
`;

function LinkCard() { 
  return()
}
function TabSection() {
  return (
    <>
      {linkList?.map((obj, idx) =>
        obj[Object.keys(obj)].map((element, id) => (
          // 이부분 카드형식으로 묶기
          <Tab.Pane eventKey={idx} unmountOnExit="true" >
            <LinkCardWrapper>{element.price} 카드형식이 들어갈곳</LinkCardWrapper>
          </Tab.Pane>
        ))
      )}
    </>
  );
}

function LinkContent() {
  return (
    <Tab.Content>
      <TabWrapper>
        <TabSection />
      </TabWrapper>
    </Tab.Content>
  );
}
function Content() {
  return (
    <ContentWrapper>
      <LeftSection>
        CategorySection
        <Tab.Container id="tab" defaultActiveKey="0" >
          <Row>
            <Col sm={2}>
              <CategoryTab />
            </Col>

            <Col sm={10}>
              <LinkContent />
            </Col>
          </Row>
        </Tab.Container>
      </LeftSection>
      <RightSection>RightSection</RightSection>
    </ContentWrapper>
  );
}

export default Content;
