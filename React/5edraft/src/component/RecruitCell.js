import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import WeekCell from './WeekCell';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    recruiting:  {
        backgroundColor: '#49b3ef',

    },
    null:{
        backgroundColor: 'salmon',

    }
});

function RecruitCell(props){

const contentArr = props.content;
const classes = useStyles();
    return(
        <TableRow>
           <TableCell align="center">{contentArr}</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>

           <TableCell padding="none" className={classes.null}>.</TableCell>
           <TableCell padding="none" className={classes.null}>.</TableCell>
           <TableCell padding="none" className={classes.null}>.</TableCell>
           <TableCell padding="none" className={classes.null}>.</TableCell>

           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>

           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>

           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>

           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>

           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>

           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>

           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>

           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>

           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>

           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>
           <TableCell padding="none" className={classes.recruiting}>.</TableCell>


        </TableRow>
    );
}

export default RecruitCell;


//셀 48개만드삼.