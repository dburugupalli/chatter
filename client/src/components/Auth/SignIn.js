import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TwitterIcon from "@material-ui/icons/Twitter";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

export function Copyright() {
  return (
    <Typography style={{position: 'absolute',
        bottom: 0,
        padding: '20px',
        paddingLeft: 120,
        display: 'flex',
        justifyContent: 'center'
        }} variant="body2" color="textSecondary" align="center">
      {'Copyright ©'}
      <Link style={{marginLeft:5, marginRight: 5}} color="inherit" href="https://material-ui.com/">
        Chatter
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#50b7f5',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#50b7f5',
    color: 'white'
  },
}));

export default function SignIn({changeActiveRoute}) {
  const classes = useStyles();

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <TwitterIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Username"
            label="Username"
            name="Username"
            autoComplete="Username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
          style={{height: '50px !important',borderRadius: '20px !important'}}
          fullWidth
          variant="contained"
          type="submit"
          className="tweetBox__tweetButton"
        >
          Sign In
          </Button>
          <Grid container style={{marginTop: 20}}>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link style={{cursor:'pointer'}} variant="body2" onClick={changeActiveRoute}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}