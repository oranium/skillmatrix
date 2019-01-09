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
import { updateOwnProfile } from 'rest/handleCommonRequests';

export default class FormDialog extends Component {
  handleClose = () => {
    store.dispatch(resetForm);
    store.dispatch(closeProfileDialog);
  };

  async handleSubmit(skill) {
    await updateOwnProfile(RestPoints.setSkills, skill);
    this.handleClose();
  }
  getAllSkillsRecursive(skill, allSkills, aktPath) {
    allSkills.push(aktPath);
    skill.subcategories.map(subskill => {
      this.getAllSkillsRecursive(subskill, allSkills, aktPath + '/' + subskill.skillname);
    });
    return allSkills;
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
    var { levelfield, singleselect } = state.formState;
    var profile = this.getProfile(state);

    function handleNewSkill(skill) {
      singleselect.value = skill;
    }

    const aktSkill = {
      username: profile.username,
      skills: { [singleselect.value]: levelfield.value },
    };

    var allSkillsOfUser = [];
    Object.keys(profile.skills).map(index => {
      Object.keys(profile.skills[index].subcategories).map(subskill => {
        if (allSkillsOfUser.length === 0) {
          allSkillsOfUser = this.getAllSkillsRecursive(
            profile.skills[index].subcategories[subskill],
            [],
            profile.skills[index].skillname +
              '/' +
              profile.skills[index].subcategories[subskill].skillname,
          );
        } else
          allSkillsOfUser.push(
            ...this.getAllSkillsRecursive(
              profile.skills[index].subcategories[subskill],
              [],
              profile.skills[index].skillname +
                '/' +
                profile.skills[index].subcategories[subskill].skillname,
            ),
          );
      });
    });

    const availableNewSkills = [];
    Object.keys(allSkills).map(index => {
      for (var key in allSkills[index]) {
        if (!allSkillsOfUser.includes(key)) {
          availableNewSkills.push(key);
        }
      }
    });
    var guidelines;
    Object.keys(allSkills).map(index => {
      for (var key in allSkills[index]) {
        if (singleselect.value === key) {
          guidelines = allSkills[index][key];
        }
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

            <SingleSelect placeholder={'Select a skill to add'} allSkills={availableNewSkills} />
            <LevelPicker
              data={levelfield}
              guidelines={guidelines}
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
            <Button onClick={() => this.handleSubmit(aktSkill)} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
