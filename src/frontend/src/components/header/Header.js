import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { AccountCircle, PowerSettingsNew, Search, Add } from '@material-ui/icons';
// import redux parts
import store from '../../Store';
import {
  switchPage,
  setError,
  resetState,
  changeProfileOwner,
  resetSearch,
  openProfileDialog,
} from 'actions';

// Rest
import RestPoints from '../../rest/Init';
import RestCom from '../../rest/Rest';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends Component {
  static openNewSkillDialog() {
    // open dialog to add completly new skill to database
    store.dispatch(openProfileDialog('newSkill'));
  }
  static switchToPage(page) {
    store.dispatch(switchPage(page));
  }

  switchToProfilePage = () => {
    store.dispatch(changeProfileOwner(0));
    this.constructor.switchToPage('profile');
  };

  switchToSearchPage = () => {
    store.dispatch(resetSearch);
    this.constructor.switchToPage('search');
  };

  async handleLogout() {
    const { state } = this.props;
    const user = {
      username: state.user.username,
    };
    const Rest = new RestCom(RestPoints.logout, JSON.stringify(user));
    try {
      await Rest.post();
      // logout in frontend
      // reset state
      store.dispatch(resetState);
      // go back to login
      store.dispatch(switchPage('login'));
    } catch (e) {
      // display error Message to user<
      console.log(e);
      store.dispatch(setError(e.message));
    }
  }

  render() {
    const { classes, user } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              onClick={this.switchToProfilePage}
              color="inherit"
              aria-label="own profile"
              title="show own profile"
            >
              <AccountCircle />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {user.name}
            </Typography>
            <IconButton
              className={classes.menuButton}
              onClick={this.constructor.openNewSkillDialog}
              color="inherit"
              aria-label="add new skill"
              title="new skill"
            >
              <Add onClick={this.openNewSkillDialog} />
            </IconButton>
            <IconButton
              className={classes.menuButton}
              onClick={this.switchToSearchPage}
              color="inherit"
              aria-label="open search"
              title="search"
            >
              <Search />
            </IconButton>
            <IconButton
              className={classes.menuButton}
              onClick={() => this.handleLogout()}
              color="inherit"
              aria-label="logout"
              title="logout"
            >
              <PowerSettingsNew />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(ButtonAppBar);
