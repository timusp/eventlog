import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Grid,Container,Box} from '@material-ui/core/';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  
});

export default function EventCard() {
  const classes = useStyles();
  const cont = {
    backgroundColor: 'teal',
    height:600,
    width:500,
  }
  return (
<div>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/covid-19-corona-virus-prevention-poster-design-template-7eafeb97181606ad03bbe2e56324593c_screen.jpg?ts=1585635679"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    <Container
        align="center"
        justify="center"
        maxWidth="sm"
        style={cont}
        >
        <Box height="90%"  justify="center" overflow="hidden">
          <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/covid-19-corona-virus-prevention-poster-design-template-7eafeb97181606ad03bbe2e56324593c_screen.jpg?ts=1585635679" />
        </Box>
        <Box height="10%"  justify="center" overflow="hidden" margin={1}>
          <Grid container justify="center">
            <Grid item xs={6}>
              <Button variant="contained" color="primary">More</Button>  
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="secondary">Register</Button>  
            </Grid>
          </Grid>
        </Box>

        
        
    </Container>
</div>  );
}