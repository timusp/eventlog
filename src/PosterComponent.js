import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import dance_club from './images/dance_club.png';
import au_logo from './images/aulogo.png';
import logo192 from './images/aulogo.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    width: 400,
    height: "100%",
  },
});

export default function PosterComponent() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea style={{border: "2px solid #f1f1f1"}}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          maxHeight="200"
          padding="20"
          className={classes.media}
          image={dance_club}
          title="Contemplative Reptile"
          
        />
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
        </CardContent> */}
      </CardActionArea>
      <CardActions style={{backgroundColor: "#f1f1f1"}}>
        <Button size="small" color="primary" style={{backgroundColor :"grey", color: "white"}}>
          Register
        </Button>

        <Button size="small" color="primary" style={{backgroundColor :"white", color: "black", border:"1px solid grey", display: "flex",
  justifyContent: "flex-end"}}>
          Deadline: date
        </Button>
      </CardActions>
    </Card>
  );
}
