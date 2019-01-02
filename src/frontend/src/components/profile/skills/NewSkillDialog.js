// react
import React, { Component } from 'react';

// components
import { DateInput, TextArea, LevelPicker } from 'components/common/InputFields';
import SingleSelect from 'components/common/SingleSelect';

// material-ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

export default class FormDialog extends Component {
  handleClose = () => {
    store.dispatch(resetForm);
    store.dispatch(closeProfileDialog);
  };

  async handleSubmit(skill, milestone) {
    let Rest = new RestCom(RestPoints.setSkills, JSON.stringify(skill));
    try {
      const { data } = await Rest.post();
      store.dispatch(setOwnProfile(data));
    } catch (e) {
      store.dispatch(setError(e.message));
    }
    this.handleClose();
  }

  handleChange(id, value) {
    store.dispatch(updateInput(id, value));
  }

  getPerson = state => {
    return state.profile.person;
  };

  getProfile = state => {
    return state.profile.profiles[this.getPerson(state)];
  };

  render() {
    const state = store.getState();

    const { allSkills } = state;
    const { showDialog } = state.profile;
    var { datefield, textarea, levelfield, singleselect } = state.formState;
    var profile = this.getProfile(state);

    function handleNewSkill(skill) {
      singleselect.value = skill;
    }

    const aktSkill = {
      username: profile.username,
      skills: { [singleselect.value]: levelfield.value },
    };

    const allSkillsOfUser = Object.keys(profile.skills).map(
      element => profile.skills[element].skillname,
    );

    const availableNewSkills = [];
    for (var key in Object.keys(allSkills)) {
      if (allSkills.hasOwnProperty(key)) {
        if (!allSkillsOfUser.includes(allSkills[key])) {
          availableNewSkills.push(allSkills[key]);
        }
      }
    }

    return (
      <div>
        <Dialog
          open={showDialog === 'skill'}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New skill</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new Skill please fill in all inputfields.
            </DialogContentText>

            <SingleSelect placeholder={'Select a skill to add'} allSkills={availableNewSkills} />
            <LevelPicker
              data={levelfield}
              required={true}
              onChange={(id, value) => this.handleChange(id, value)}
            />

            {/* <DateInput data={datefield} onChange={(id, value) => this.handleChange(id, value)} />
            <TextArea data={textarea} onChange={(id, value) => this.handleChange(id, value)} /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleSubmit(aktSkill, false)} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
