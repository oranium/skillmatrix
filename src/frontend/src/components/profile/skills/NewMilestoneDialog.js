// react
import React from 'react';

// components
import { DateInput, TextArea } from 'components/common/InputFields';
import SingleSelect from 'components/common/SingleSelect';
import RadioGroupShowLevel from 'components/common/RadioGroupShowLevel';

// material-ui
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
import { updateOwnProfile } from 'rest/handleCommonRequests';

export default class FormDialog extends React.Component {
  handleClose = () => {
    store.dispatch(resetForm);
    store.dispatch(closeProfileDialog);
  };

  getAllSkillsRecursive(skill, allSkills, aktPath) {
    allSkills.push(aktPath);
    skill.subcategories.map(subskill => {
      this.getAllSkillsRecursive(subskill, allSkills, aktPath + '>' + subskill.skillname);
    });
    return allSkills;
  }

  getaktLevelRecursive(skill, aktPath, path, level) {
    if (aktPath === path) {
      level = skill.level;
      return level;
    }
    skill.subcategories.map(subskill => {
      if (
        this.getaktLevelRecursive(subskill, aktPath + '>' + subskill.skillname, path, level) !== 0
      ) {
        level = this.getaktLevelRecursive(
          subskill,
          aktPath + '>' + subskill.skillname,
          path,
          level,
        );
      }
    });
    return level;
  }

  async handleSubmit(milestone) {
    console.log(milestone);
    if (milestone.datum === '' || milestone.comment === '' || milestone.skill === '') {
      milestone = false;
    }
    if (milestone) {
      await updateOwnProfile(RestPoints.milestone, milestone);
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

    const aktSkill = singleselect.value.split('>').pop();

    var aktLevel = 0;

    //holt das aktuelle Level des im Select ausgewählten Skill aus dem State
    Object.keys(currentProfile.skills).map(index => {
      if (
        this.getaktLevelRecursive(
          currentProfile.skills[index],
          currentProfile.skills[index].skillname,
          singleselect.value,
          0,
        ) != 0
      ) {
        aktLevel = this.getaktLevelRecursive(
          currentProfile.skills[index],
          currentProfile.skills[index].skillname,
          singleselect.value,
          0,
        );
      }
    });
    // todo change map function
    const aktMilestone = {
      username: currentProfile.username,
      skill: aktSkill,
      date: datefield.value,
      level: aktLevel,
      comment: textarea.value,
    };

    var allSkillsOfUser = [];
    Object.keys(currentProfile.skills).map(index => {
      Object.keys(currentProfile.skills[index].subcategories).map(subskill => {
        if (allSkillsOfUser.length === 0) {
          allSkillsOfUser = this.getAllSkillsRecursive(
            currentProfile.skills[index].subcategories[subskill],
            [],
            currentProfile.skills[index].skillname +
              '>' +
              currentProfile.skills[index].subcategories[subskill].skillname,
          );
        } else
          allSkillsOfUser.push(
            ...this.getAllSkillsRecursive(
              currentProfile.skills[index].subcategories[subskill],
              [],
              currentProfile.skills[index].skillname +
                '>' +
                currentProfile.skills[index].subcategories[subskill].skillname,
            ),
          );
      });
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
            <RadioGroupShowLevel level={aktLevel} />
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
