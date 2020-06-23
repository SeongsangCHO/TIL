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
import TableHeader from './TableHeader';
import TableContent from './TableContent';

function Content(){

    const monthList = ['1월','2월','3월','4월','5월','6월',
                  '7월','8월','9월','10월','11월','12월'];

    
    return(
        <TableContainer component={Paper}>
            <div>테이블도 반복문해서 만들면 될것같고.</div>
        <Table aria-label="spanning table">
            <TableHeader/>
            <TableContent title={'42서울'} recruitCnt={4}/>
         </Table>

        <div>header를 hidden할수없나 프로그램마다 테이블 여러개를 만들어 볼까 | 전달할 값이 프로그램명, 기수의 갯수, 일정</div>
        <Table aria-label="spanning table">
            <TableHeader/>
            <TableContent title={'부스트캠프'} recruitCnt={4}/>
        </Table>

      </TableContainer>
    );

}
export default Content;


{/* <div className="Content">
컨텐츠내용
</div> */}

// {monthList.map((month, index)=>(
//     <MonthHeader key={index} name={month}/>
// ))}   