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

// import redux parts
import store from 'Store';
import {
  switchPage,
  setLoginError,
  setUser,
  setAllSkills,
  setOwnProfile,
  resetState,
} from 'actions';

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends Component {
  static async handleLogin(username, password) {
    const loginCredentials = {
      username,
      password,
    };
    const Rest = new RestCom(RestPoints.login, JSON.stringify(loginCredentials));

    try {
      const { data } = await Rest.post();
      const { user, allSkills } = data;
      store.dispatch(setUser({ username: user.username, name: user.name }));
      store.dispatch(setAllSkills(allSkills));
      store.dispatch(setOwnProfile(user));
      store.dispatch(switchPage('search'));
    } catch (e) {
      store.dispatch(resetState);
      store.dispatch(setLoginError(e.message));
    }
  }

  componentDidMount() {
    // Get the components DOM node
    const elem = ReactDOM.findDOMNode(this);
    console.log(elem);
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
    const { classes, errorMsg } = this.props;
    let password = '';
    let username = '';

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Skill Matrix
          </Typography>
          <p className="error">{errorMsg}</p>
          <form
            onSubmit={(evt) => {
              evt.preventDefault();
              this.constructor.handleLogin(username, password);
            }}
            className={classes.form}
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                onChange={(evt) => {
                  username = evt.target.value;
                }}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                onChange={(evt) => {
                  password = evt.target.value;
                }}
                autoComplete="current-password"
              />
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
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(SignIn);
