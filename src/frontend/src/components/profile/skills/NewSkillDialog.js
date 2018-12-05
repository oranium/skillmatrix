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
import { changeView, openProfileDialog, closeProfileDialog, updateInput, resetForm } from 'actions';

export default class FormDialog extends React.Component {
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    store.dispatch(resetForm);
    store.dispatch(closeProfileDialog);
  };

  handleSubmit = skill => {
    console.log(skill);
    //skill objekt an api übergenen

    this.handleClose();
  };

  handleChange(id, value) {
    store.dispatch(updateInput(id, value));
  }

  render() {
    const state = store.getState();

    const { showDialog } = state.profile;
    var { datefield, textarea, levelfield, singleselect } = state.formState;

    var profile = state.profile.profiles[state.profile.person];
    var newSkill = '';
    const aktMilestone = [
      {
        datum: datefield.value,
        level: levelfield.value,
        comment: textarea.value,
      },
    ];

    const aktSkill = {
      username: profile.username,
      skills: { skillname: singleselect.value, level: levelfield.value, milestones: aktMilestone },
    };
    const allSkillsOfUser = [];
    Object.keys(profile.skills).map(element => {
      allSkillsOfUser[element] = profile.skills[element].skillname;
    });

    const availableNewSkills = [];

    Object.keys(state.allSkills).map(index => {
      if (!allSkillsOfUser.includes(state.allSkills[index])) {
        availableNewSkills.push(state.allSkills[index]);
      }
    });

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
            <SingleSelect allSkills={availableNewSkills} />
            <TextField
              id="standard-with-placeholder"
              label="With placeholder"
              placeholder="Placeholder"
              margin="normal"
              onChange={event => (newSkill = event.target.value)}
            />

            <Button onClick={() => (singleselect.value = newSkill)}>+</Button>
            <LevelPicker data={levelfield} onChange={(id, value) => this.handleChange(id, value)} />
            <DateInput data={datefield} onChange={(id, value) => this.handleChange(id, value)} />
            <TextArea data={textarea} onChange={(id, value) => this.handleChange(id, value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleSubmit(aktSkill)} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
