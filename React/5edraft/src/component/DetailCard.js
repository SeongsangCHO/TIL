import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../42seoul.svg';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',

  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="330"
          src={logo}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component={'p'}>
            42서울
          </Typography>
          <Typography variant="body2" color="textSecondary" component={'p'}>
            모집일정: 2020년 모집마감
          </Typography>
          <Typography variant="body2" color="textSecondary" component={'p'}>
            지원자격: 해당년도 1월 1일 기준 성인 또는 해당년도 3월 1일 기준 고졸
          </Typography>
          <Typography variant="body2" color="textSecondary" component={'p'}>
            모집인원: 기수당 250여명
          </Typography>
          <Typography variant="body2" color="textSecondary" component={'p'}>
            교육기간: 최대 2년
          </Typography>          <Typography variant="body2" color="textSecondary" component={'p'}>
            혜택: 월 100 (세전)
          </Typography>          <Typography variant="body2" color="textSecondary" component={'p'}>
            교육지역: 서울시 강남구 개포디지털혁신파크
          </Typography>          <Typography variant="body2" color="textSecondary" component={'p'}>
            주관: 이노베이션 아카데미
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          공유하기
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}