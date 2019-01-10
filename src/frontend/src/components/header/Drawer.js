import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// icons
import AddIcon from '@material-ui/icons/Add';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';

// import redux parts
import { openProfileDialog, changeProfileOwner, switchPage } from 'actions';
import store from '../../Store';

// Rest
import RestPoints from '../../rest/Init';
import RestCom from '../../rest/Rest';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class TemporaryDrawer extends Component {
  openNewSkillDialog() {
    // open dialog to add completly new skill to database
    store.dispatch(openProfileDialog('newSkill'));
  }

  openRemoveSkillDialog() {
    // open dialog to remove any skill from database
    store.dispatch(openProfileDialog('removeSkill'));
  }

  static switchToPage(page) {
    store.dispatch(switchPage(page));
  }

  switchToProfilePage = () => {
    store.dispatch(changeProfileOwner(0));
    TemporaryDrawer.switchToPage('profile');
  };

  render() {
    const { classes, open, closeDrawer, name } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List subheader={<ListSubheader component="div">{name}</ListSubheader>}>
          <ListItem button onClick={this.switchToProfilePage}>
            <ListItemIcon>
              <ProfileIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
        </List>
        <Divider />
        <List subheader={<ListSubheader component="div">Administrative</ListSubheader>}>
          <ListItem button onClick={this.openNewSkillDialog}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="New Skill" />
          </ListItem>
          <ListItem button onClick={this.openRemoveSkillDialog}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Remove Skill" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <Drawer open={open} onClose={closeDrawer}>
          <div tabIndex={0} role="button" onClick={closeDrawer} onKeyDown={closeDrawer}>
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
