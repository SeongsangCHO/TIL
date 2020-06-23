import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';




function TableHeader(){

    const monthList = ['1월','2월','3월','4월','5월','6월',
    '7월','8월','9월','10월','11월','12월'];


    return(
        <TableHead>
            <TableRow>
            <TableCell >프로그램명</TableCell>
            <TableCell rowSpan={3}>기수</TableCell>

            {monthList.map((month, idx)=>(
                <TableCell colSpan={4} key={idx}>{month}</TableCell>
                ))}
            </TableRow>
      </TableHead>
    );
}

export default TableHeader;

//기수의 colspan은 기수의 갯수
//월마다 4개씩 또는 월에 해당하는 일수만큼(배열) cell할당.
