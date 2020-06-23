import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../css/content.css'

const MonthHeader = ({month}) =>{
    return (<TableCell>{month}월</TableCell>);
  
}

function Content(){

    const monthList = ['1월','2월','3월','4월','5월','6월',
                  '7월','8월','9월','10월','11월','12월'];

    
    return(
        <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>프로그램명</TableCell>
              {monthList.map((month, index)=>(
                  <MonthHeader key={index} name={month}/>
              ))}
            </TableRow>
        
          </TableHead>

          <TableBody>

            <TableRow>

              <TableCell>42서울</TableCell>
              <TableCell>냠</TableCell>
            </TableRow>
           
          </TableBody>
        </Table>
      </TableContainer>
      

    );

}
export default Content;


{/* <div className="Content">
컨텐츠내용
</div> */}