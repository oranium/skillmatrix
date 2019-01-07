// react
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// material-ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

// import redux parts
import store from 'Store';
import {
  switchPage, setLoginError, setUser, setOwnProfile,
} from 'actions';

import { updateAllSkills } from 'rest/handleCommonRequests';

// Rest
import RestPoints from 'rest/Init';
import RestCom from 'rest/Rest';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  spinner: {
    margin: theme.spacing.unit,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends Component {
  static async handleLogin(event) {
    // avoid reloading on submit
    event.preventDefault();
    // avoid event is nullified => https://reactjs.org/docs/events.html#event-pooling
    event.persist();

    const { target } = event;

    // ensure immutability
    const usernameInput = { ...target.username };
    const passwordInput = { ...target.password };

    const loginCredentials = {
      username: usernameInput.value,
      password: passwordInput.value,
    };

    const Rest = new RestCom(RestPoints.login, JSON.stringify(loginCredentials));

    try {
      const { user } = await Rest.post();
      const { username, name } = user;
      store.dispatch(setUser({ username, name }));
      store.dispatch(setOwnProfile(user));
      store.dispatch(switchPage('search'));
    } catch (e) {
      // clear password input
      target.password.value = '';
      store.dispatch(setLoginError(e.message));
    }

    await updateAllSkills();
  }

  componentDidMount() {
    // Get the components DOM node
    const elem = ReactDOM.findDOMNode(this);
    // Set the opacity of the element to 0
    elem.style.opacity = 0;
    window.requestAnimationFrame(() => {
      // Now set a transition on the opacity
      elem.style.transition = 'opacity 250ms';
      // and set the opacity to 1
      elem.style.opacity = 1;
    });
  }

  render() {
    const { classes, errorMsg, loading } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          {loading ? (
            <CircularProgress className={classes.spinner} />
          ) : (
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
          )}
          <Typography component="h1" variant="h4">
            Skill Matrix
          </Typography>
          <p className="error">{errorMsg}</p>
          <form onSubmit={this.constructor.handleLogin} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" name="username" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" defaultValue="" />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => store.dispatch(switchPage('search'))}
          >
            skip login (dev only)
          </Button>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(SignIn);
