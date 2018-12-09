// react
import React from 'react';

// components
import { DateInput, TextArea } from 'components/common/InputFields';
import SingleSelect from 'components/common/SingleSelect';

// material-ui
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// redux
import store from 'Store';
import { closeProfileDialog, updateInput, resetForm, setOwnProfile, setError } from 'actions';

// Rest
import RestPoints from 'rest/Init';
import RestCom from 'rest/Rest';

export default class FormDialog extends React.Component {
  handleClose = () => {
    store.dispatch(resetForm);
    store.dispatch(closeProfileDialog);
  };

  async handleSubmit(milestone) {
    console.log(milestone);

    const Rest = new RestCom(RestPoints.skill, JSON.stringify(milestone));
    try {
      const { data } = await Rest.post();
      store.dispatch(setOwnProfile(data));
    }
    catch (e) {
      store.dispatch(setError(e.message));
    }
    this.handleClose();
    //todo change to new api result and remove JSON stringify
  }

  handleChange(id, value) {
    store.dispatch(updateInput(id, value));
  }

  render() {
    const state = store.getState();
    const { showDialog, person, profiles } = state.profile;
    const { datefield, textarea, singleselect } = state.formState;
    var currentProfile = profiles[person];

    const aktSkill = singleselect.value;

    var aktLevel = 'choose a Skill';

    //holt das aktuelle Level des im Select ausgewählten Skill aus dem State
    Object.keys(currentProfile.skills).map(index => {
      if (currentProfile.skills[index].skillname === aktSkill) {
        aktLevel = currentProfile.skills[index].level;
      }
    });
    // todo change map function
    const aktMilestone = {
      username: currentProfile.username,
      skill: aktSkill,
      datum: datefield.value,
      level: aktLevel,
      comment: textarea.value,
    };

    const allSkillsOfUser = [];
    //holt alle skills, die der User besitzt aus dem State
    Object.keys(currentProfile.skills).map(element => {
      allSkillsOfUser[element] = currentProfile.skills[element].skillname;
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
