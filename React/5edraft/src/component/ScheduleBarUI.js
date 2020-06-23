import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DetailCard from '../component/DetailCard';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'div'}>{children}</Typography>
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
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function ScheduleBarUI() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue+' 으로 변함');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="42서울" {...a11yProps(0)} />
          <Tab label="부스트캠프" {...a11yProps(1)} />
          <Tab label="ssafy" {...a11yProps(2)} />
          <Tab label="sw마에스트로" {...a11yProps(3)} />
          <Tab label="감자튀김" {...a11yProps(4)} />
          <Tab label="먹고싶다" {...a11yProps(5)} />
          <Tab label="맥주랑" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        부트캠프일정여기변하냐
        <DetailCard/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        해커톤일정
      </TabPanel>
      <TabPanel value={value} index={2}>
        컨퍼런스일정
      </TabPanel>
      <TabPanel value={value} index={3}>
        아직도
      </TabPanel>
      <TabPanel value={value} index={4}>
        감자튀김
      </TabPanel>
      <TabPanel value={value} index={5}>
        먹고싶다
      </TabPanel>
      <TabPanel value={value} index={6}>
        맥주랑
        <div>
        <DetailCard/>
        </div>
      </TabPanel>
      
    </div>
  );
}

export default ScheduleBarUI;