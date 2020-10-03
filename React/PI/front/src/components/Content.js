import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./css/Content.css";
import { Card } from "antd";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="TabPanel"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

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
      },
      {
        id: 2,
        title: "탄산수",
        link: "coupang.com",
        price: "90000",
      },
      {
        id: 3,
        title: "쌀",
        link: "coupang.com",
        price: "90000",
      },
      {
        id: 4,
        title: "샴푸",
        link: "coupang.com",
        price: "90000",
      },
      {
        id: 5,
        title: "고기",
        link: "coupang.com",
        price: "90000",
      },
      {
        id: 6,
        title: "햇반",
        link: "coupang.com",
        price: "90000",
      },
      {
        id: 7,
        title: "고무",
        link: "coupang.com",
        price: "90000",
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
      },
      {
        id: 2,
        title: "후드티",
        link: "coupang.com",
        price: "90000",
      },
    ],
  },
];

function LinkCard({ obj }) {
  const { id, title, link, price } = obj;
  console.log(obj);
  return (
    <div className="card-section">
      {obj[Object.keys(obj)].map((element, idx) => (
        <Card
          key={idx}
          title={element.title}
          bordered={false}
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <p>{element.title}</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      ))}
    </div>
  );
}

function Content() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="content-wrapper">
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="on"
            aria-label="scrollable auto tabs example"
          >
            {categoryList?.map((v, idx) => (
              <Tab
                label={v.title}
                key={idx}
                {...a11yProps(`${v.id - 1}`)}
              ></Tab>
            ))}
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <div>추가버튼</div>
          </Tabs>
        </AppBar>
        <div>링크추가버튼</div>
        {linkList?.map((obj, idx) => (
          <TabPanel key={idx} value={value} index={idx}>
            {obj[Object.keys(obj)].title}
            <LinkCard key={idx} obj={obj} />
          </TabPanel>
        ))}
      </div>
    </div>
  );
}

export default Content;
