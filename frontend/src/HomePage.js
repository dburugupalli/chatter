import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment'
import './HomePage.css'
import TwitterIcon from '@material-ui/icons/Twitter';
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  root: {
    height: 500,
    paddingBottom:30,
    marginTop: 20,
  },
  media: {
    height: 300,
    width:250,
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:'auto',
    marginBottom:'auto',
    justifyContent:'center',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'red',
  },

  homeavatar:{
      backgroundColor: 'red',
  },

  rightroot: {
    width: '100%',
    maxWidth: '36ch',
    borderColor : 'black',
    borderStyle:'solid',
    backgroundColor:'#F8F9FA',

  },
  rightinline: {
    display: 'inline',
  },
}));
  


export default function RecipeReviewCard() {
const classes = useStyles();
const tweets = [{
    tweet_image:"https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
    tweet_author:"Elon Musk",
    tweet_description:"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    tweet_date:"September 14, 2016"
},
{
    tweet_image:"https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
    tweet_author:"Elon Musk",
    tweet_description:"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    tweet_date:"September 14, 2016"
},
];

  return (
    <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
        <div classname="leftSection">
            <TwitterIcon color="primary" style={{width:70, height:70, marginBottom:70}}></TwitterIcon>
            <Paper className="menu">
                <MenuList>
                <MenuItem className="menuitem">
                <ListItemIcon>
                <HomeIcon color="primary" fontSize="large" />
                </ListItemIcon>
                Home</MenuItem>
                <Divider component="li" />

                <MenuItem className="menuitem">
                <ListItemIcon>
                <ExploreIcon color="primary" fontSize="large" />
                </ListItemIcon>
                Explore</MenuItem>
                <Divider component="li" />

                <MenuItem className="menuitem">
                <ListItemIcon>
                <CommentIcon color="primary" fontSize="large" />
                </ListItemIcon>
                Messages</MenuItem>
                </MenuList>
            </Paper>

        </div>
        
        <div classname = "middleSection">
            <h2 class="title">Home</h2>
            <Card className="homecard">
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe" className={classes.homeavatar}>
                            R
                        </Avatar>
                        }
                        title="What's happening?"
                    />
                    
                    <form noValidate autoComplete="off">
                    <TextField className= "tweettextbox" multiline rows={4} />
                    </form>
                    
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                        <ImageIcon color="primary"/>
                        </IconButton>
                        <IconButton aria-label="add to favorites">
                        <GifIcon color="primary"/>
                        </IconButton>
                        <IconButton aria-label="add to favorites">
                        <EqualizerIcon color="primary"/>
                        </IconButton>
                        <IconButton aria-label="add to favorites">
                        <InsertEmoticonIcon color="primary"/>
                        </IconButton>
                        <IconButton aria-label="CommentIcon">
                        <InsertInvitationIcon color="primary"/>
                        </IconButton>
                        <Button variant="contained" color="primary" className="tweetbutton">Tweet</Button>
                    </CardActions>
            </Card>
        <section className="cardsection">
            {tweets.map((tweet)=>{
                return(
                    <Card className={classes.root}>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                        }
                        title= {tweet.tweet_author}
                        subheader= {tweet.tweet_date}
                    />
                    <CardMedia
                        className={classes.media}
                        image={tweet.tweet_image}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {tweet.tweet_description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="CommentIcon">
                        <CommentIcon/>
                        </IconButton>
                    </CardActions>
                    </Card>
                )
            }
            )}
        </section>
        </div>


    <div className="rightSection">
        <div className="SearchBar">
           <SearchIcon className="searchicon">Search</SearchIcon>
        </div>
        <List className={classes.rightroot}>
        <h3>What's Happening</h3>
        <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.rightinline}
                color="textPrimary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.rightinline}
                color="textPrimary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.rightinline}
                color="textPrimary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
        </div>

    </div>
  );
}
