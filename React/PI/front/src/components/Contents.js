import React, { Component } from "react";
import "./css/Contents.css";
import { Card, Col, Row } from "antd";
import { Popover, Button } from "antd";

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

function SideBar() {
  return (
    <div className="side-bar">
      사이드바
      <Card title="물" bordered={false}>
        링크 아이콘
      </Card>
      <Card title="뮬1" bordered={false}>
        Card content2
      </Card>
      <Card title="물2" bordered={false}>
        Card content3
      </Card>
      <div>사이드1</div>
      <div>사이드2</div>
      <div>사이드3</div>
      <div>사이드4</div>
      <div>사이드5</div>
      <div>사이드6</div>
    </div>
  );
}

function Contents() {
  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="categories">
          카테고리
          <div>전체</div>
        </div>
        <div className="category">
          생필품
          <div className="card-section">
            <div className="card">
              <div>물인가 뭔가이게</div>
              <Popover content={content} title="Title" trigger="click">
                <Button className="btn">물</Button>
              </Popover>
            </div>
            <div className="card">카드2</div>
            <div className="card">카드3</div>
            <div className="card">카드4</div>
            <div className="card">카드5</div>
            <div className="card">카드6</div>
          </div>
        </div>
      </div>
      <SideBar></SideBar>
      {/* <Categories></Categories> 카테고리 */}
      {/* <CardSection><Card></CardSection> 카드섹션 */}
    </div>
  );
}
export default Contents;
