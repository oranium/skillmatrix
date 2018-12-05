import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DateInput, TextArea, LevelPicker } from 'components/common/InputFields';
import SingleSelect from 'components/common/SingleSelect';

// redux
import store from 'Store';
import { closeProfileDialog, updateInput, resetForm } from 'actions';
import { Typography } from '@material-ui/core';

export default class FormDialog extends React.Component {
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    store.dispatch(resetForm);
    store.dispatch(closeProfileDialog);
  };

  handleSubmit(milestone) {
    console.log(milestone);
    this.handleClose();
  }

  handleChange(id, value) {
    store.dispatch(updateInput(id, value));
  }

  render() {
    const state = store.getState();
    const { showDialog } = state.profile;
    const { datefield, textarea, singleselect } = state.formState;
    var profile = state.profile.profiles[state.profile.person];

    const aktSkill = singleselect.value;

    var aktLevel = 'choose a Skill';

    //holt das aktuelle Level des im Select ausgewählten Skill aus dem State
    Object.keys(profile.skills).map(index => {
      if (profile.skills[index].skillname == aktSkill) {
        aktLevel = profile.skills[index].level;
      }
    });
    const aktMilestone = {
      username: profile.username,
      skill: aktSkill,
      datum: datefield.value,
      level: aktLevel,
      comment: textarea.value,
    };

    const allSkillsOfUser = [];
    //holt alle skills, die der User besitzt aus dem State
    Object.keys(profile.skills).map(element => {
      allSkillsOfUser[element] = profile.skills[element].skillname;
    });
    return (
      <div>
        <Dialog
          open={showDialog === 'milestone'}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New milestone</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new milestone please fill in all inputfields.
            </DialogContentText>
            <SingleSelect allSkills={allSkillsOfUser} />
            <Typography>Level: {aktLevel}</Typography>
            <DateInput data={datefield} onChange={(id, value) => this.handleChange(id, value)} />
            <TextArea data={textarea} onChange={(id, value) => this.handleChange(id, value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleSubmit(aktMilestone)} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
