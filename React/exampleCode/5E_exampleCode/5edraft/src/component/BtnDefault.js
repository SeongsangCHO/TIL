import React,{useState, useEffect}  from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root:  {
        backgroundColor: 'white',
        color: '#49b3ef',
        border: 0,
        outline: 0,
        cursor: 'pointer',
        '&:hover': {color: 'salmon', },
    },

});

function BtnDefault(props){
    const classes = useStyles();
    const [value] = useState('');

    useEffect(()=>{
        console.log('btn create');
    });

    return(
    <button className={classes.root}>{props.value}</button>
    );
}

export default BtnDefault;