import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import RecruitCell from './RecruitCell';
function TableContent(props){

    // const content = {
    //     title : ['1기 1차']
    // };

    return(
        <TableBody>

            <TableRow>
                <TableCell rowSpan={props.recruitCnt}>{props.title}</TableCell>
            </TableRow>

            <RecruitCell recruitCnt={props.recruitCnt} content={'1기 1차'}/>

            <RecruitCell content={'1기 2차'}/>
            <RecruitCell content={'2기 1차'}/>

      </TableBody>
    );
}

export default TableContent;

// recruitCnt에 맞게 tableRow 반복문
// recruitCell이라는 컴포넌트 추가