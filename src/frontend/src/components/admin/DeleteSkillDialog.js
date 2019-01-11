// react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import SingleSkillSelect from 'components/common/SingleSkillSelect';

// material-ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

// redux
import store from 'Store';
import { closeProfileDialog, resetForm, setError, setOwnProfile } from 'actions';

// Rest
import RestPoints from 'rest/Init';
import RestCom from 'rest/Rest';
import { updateAllSkills } from 'rest/handleCommonRequests';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 0,
  },
  dialogcontent: {
    fullWidth: true,
    maxWidth: 'none',
  },
});

class RemoveSkillDialog extends Component {
  handleClose = () => {
    store.dispatch(resetForm);
    store.dispatch(closeProfileDialog);
  };

  async handleSubmit() {
    const skillToRemove = store.getState().formState.singleselect.value;
    const confirmation = window.confirm(
      'Are you sure you want to remove ' +
        skillToRemove +
        " from the database for all users? \nThis can't be undone and affects all subskills!",
    );

    if (!confirmation) {
      // user pressed cancel on confirm dialog
      // no remove api request
      return;
    }

    // Api request to remove skill from database
    const { user } = store.getState();
    const { username } = user;

    const request = {
      username,
      skillpath: skillToRemove,
      forAll: true,
    };

    const Rest = new RestCom(RestPoints.deleteSkill, request);
    //todo remove stringify

    try {
      const updatedProfile = await Rest.post();
      store.dispatch(setOwnProfile(updatedProfile));
    } catch (e) {
      store.dispatch(setError(e.message));
    }
    //update skill List
    await updateAllSkills();

    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    const state = store.getState();
    const { showDialog } = state.profile;

    return (
      <div className={classes.root}>
        <Dialog
          fullWidth
          open={showDialog === 'removeSkill'}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div className={classes.dialog}>
            <DialogTitle id="form-dialog-title">Remove skill</DialogTitle>
            <DialogContent>
              <DialogContentText className={classes.dialogcontent}>
                Remove Skill from database.
              </DialogContentText>

              <SingleSkillSelect
                placeholder={'Choose the skill you want to remove.'}
              />
              
              <Card />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => this.handleSubmit()} color="primary">
                Remove
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}
RemoveSkillDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RemoveSkillDialog);
