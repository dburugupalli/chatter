/**
 * Component for SignUp
 */
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TwitterIcon from "@material-ui/icons/Twitter";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Copyright } from "./SignIn";
import Alert from "@material-ui/lab/Alert";
import { registerUserInfo } from "../../utils/ApiManager";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#50b7f5",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// SignUp Function definition
export default function SignUp({ changeActiveRoute }) {
  const classes = useStyles();
  
  // States for Registering a User
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // State to Validate user entry. (Usernames are unique)
  const [isUserEntryValid, setIsUserEntryValid] = useState(true);

  // Function to register a user using Register API
  const registerUser = async (e) => {
    try {
      setIsUserEntryValid(true);
      e.preventDefault();

      // post api call trigger to register user
      const userRequest = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      };

      // register API call
      await registerUserInfo(userRequest);
      // move to login screen
      changeActiveRoute();
    } catch (error) {
      console.log(error);
      setIsUserEntryValid(false);
    }
  };

  // Main render function for UI
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <TwitterIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={registerUser}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                autoComplete="Username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            style={{
              height: "50px !important",
              borderRadius: "20px !important",
            }}
            fullWidth
            variant="contained"
            type="submit"
            className="tweetBox__tweetButton"
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end" style={{ marginTop: 20 }}>
            <Grid item>
              <Link
                style={{ cursor: "pointer" }}
                variant="body2"
                onClick={changeActiveRoute}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        {!isUserEntryValid ? (
          <Alert style={{ marginTop: 10 }} severity="error">
            Some issue occurred while registering the user. Try a different
            username
          </Alert>
        ) : null}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
