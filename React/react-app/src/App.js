import React , { Component } from 'react';
import './App.css';
import TOC from "./component/TOC";
import Content from "./component/Content";
import Subject from "./component/Subject";
import Paper from "@material-ui/core/Paper";
import Customer from "./component/Customer";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root:{
      width : '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto"
    },
    table: {
      minWidth: 1080
    }

})

const customers = [
  {
    'id' : 1,
    'image' :'https://placeimg.com/64/64/1',
    'name' : 'secho',
    'birthday' : '1125',
    'gender' : 'man',
    'job' : 'TT'
  },
  {
    'id' : 2,
    'image' :'https://placeimg.com/64/64/2',
    'name' : 'who',
    'birthday' : '1225',
    'gender' : 'man',
    'job' : 'TUT'
  },
  {
    'id' : 3,
    'image' :'https://placeimg.com/64/64/3',
    'name' : 'you',
    'birthday' : '0125',
    'gender' : 'girl',
    'job' : 'TOT'
  }
];






class App extends Component{
  render(){
    const { classes } = this.props;
    return(
      <div>
      <Paper className={ classes.root }>
        <Table className= { classes.table }>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image}
              name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}
            />); }) }
          </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }
}


export default withStyles(styles)(App);





  
// constructor(props){
//   super(props);
//   this.state = {
//     mode: 'welcome',
//     subject:{title:'WEB2', sub:'WWW'},
//     welcome:{title:'welcome', desc:'Hello desc'},
//     contents:[
//       {id:1, title:'HTML!', desc:'HTML is HYPERTEXT'},
//       {id:2, title:'CSS!', desc:'CSS for design'},
//       {id:3, title:'JS!', desc:'JS is fun.'}
//     ]
//   }
// }
// render(){
//   var _title, _desc = null;
//   if(this.state.mode === 'welcome'){
//     _title = this.state.welcome.title;
//     _desc = this.state.welcome.desc;
//   }
//   else if(this.state.mode === 'read'){
//     _title = this.state.contents[0].title;
//     _desc = this.state.contents[0].desc;
//   }
//   const style = {
//     backgroundColor: 'black',
//     padding: '16px',
//     color: 'white',
//     fontSize: 5 + 10 + 'px'
//   }
//   return (
//     <div className="App">
//       {/* 주석 사용방법 */}
//       <Subject title={this.state.subject.title}
//        sub={this.state.subject.sub}></Subject>
//       <Subject title="React" sub="For UI"></Subject>
//       <TOC data={this.state.contents}></TOC>
//       <Content title={_title} desc={_desc}></Content>

//       {
//         1 + 1 === 2
//           ? (<div style={style}>3항연산자 조건이 맞아요</div>)
//           : (<div>3항연산자 조건이 틀려요</div>)
//       }
//       {
//         1 + 1 === 2 && <div>AND연산자 맞아요!</div>
//       }
//     </div>
//   );
// }