import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    recruiting:  {
        backgroundColor: '#49b3ef',

    },
    null:{
        backgroundColor: 'salmon',

    }
});
function WeekCell(){
    const classes = useStyles();
    return(
        <TableCell padding="none" className={classes.recruiting}>.</TableCell>
    );
}
export default WeekCell;