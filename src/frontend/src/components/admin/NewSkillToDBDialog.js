// react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import SingleSkillSelect from 'components/common/SingleSkillSelect';
import GuidelineInputCard from 'components/admin/GuidelineInputCard';

// material-ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

// redux
import store from 'Store';
import {
  closeProfileDialog,
  resetForm,
  setError,
  toggleConfirmDialog,
  setSkillName
} from 'actions';

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
    marginBottom: '10px',
  },
});

class FormDialog extends Component {
  //
  handleSkillNameChange = event => {
    const skillname = event.target.value;
    if (skillname.includes('/')) {
      store.dispatch(setError('You can\'t use "/" in a skillname.'));
      // remove "/" from input value
      event.target.value = skillname.replace('/','');
    } else {
      store.dispatch(setSkillName(skillname));
    }
  };

  // open confirmation dialog
  handleClickOpen = () => {
    store.dispatch(toggleConfirmDialog(true));
  };
  // close confirmation dialog
  handleClickClose = () => {
    store.dispatch(toggleConfirmDialog(false));
  };

  // send new skill to database
  async handleSubmit() {
    const state = store.getState();
    const category = state.formState.singleselect.value;
    const { skillname, guideline } = state.newSkillToDBDialog;

    //build whole path for new skill
    var skillpath = '';
    category === '' ? (skillpath = skillname) : (skillpath = category + '/' + skillname);

    // #########################################################
    // send new skill
    const newSkillRequest = {
      category,
      skillname,
      skillpath,
    };

    // send guidline for new skill
    const newGuidelineRequest = {
      skillpath,
      guideline,
    };

    const RestSkillRequest = new RestCom(RestPoints.createSkill, newSkillRequest);
    const RestGuidlineRequest = new RestCom(RestPoints.setGuidelines, newGuidelineRequest);

    try {
      await RestSkillRequest.post();
      await RestGuidlineRequest.post();
    } catch (e) {
      store.dispatch(setError(e.message));
    }
    // ##########################################################

    // clean up
    this.handleClickClose();
    this.handleClose();

    await updateAllSkills();
  }

  // close NewSkillToDBDialog
  handleClose = () => {
    store.dispatch(resetForm);
    store.dispatch(closeProfileDialog);
  };

  render() {
    const state = store.getState();
    const { showDialog } = state.profile;
    const { singleselect } = state.formState;
    const { confirmDialogOpen, skillname } = state.newSkillToDBDialog;

    // dialog that is shown when user leafs category emtpy
    const confirmDialog = (
      <div className="confirm-dialog">
        <Dialog
          open={confirmDialogOpen}
          onClose={() => this.handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Are you sure you want to add "' + skillname + '" as a new category?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You didn't choose a category. This means you will add the skill as new main category
              which has no attributes.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleSubmit()} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

    // don't show guideline inputs when user wants to add category
    const showGuidelineInput = singleselect.value !== '';
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Dialog
          fullWidth
          open={showDialog === 'newSkill'}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div className={classes.dialog}>
            <DialogTitle id="form-dialog-title">New skill</DialogTitle>
            <DialogContent>
              <DialogContentText className={classes.dialogcontent}>
                To add a new Skill please fill in all inputfields.
              </DialogContentText>

              <SingleSkillSelect placeholder={'Choose the category of your skill'} />

              <TextField
                id="outlined-with-placeholder"
                label="skill name"
                placeholder="Name the skill you want to add"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={event => this.handleSkillNameChange(event)}
                value={skillname}
                fullWidth
              />
              {showGuidelineInput && <GuidelineInputCard />}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              {state.formState.singleselect.value.length === 0 ? (
                <Button onClick={() => this.handleClickOpen()} color="primary">
                  Submit
                </Button>
              ) : (
                <Button onClick={() => this.handleSubmit()} color="primary">
                  Submit
                </Button>
              )}
            </DialogActions>
          </div>
        </Dialog>
        {confirmDialog}
      </div>
    );
  }
}
FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormDialog);
