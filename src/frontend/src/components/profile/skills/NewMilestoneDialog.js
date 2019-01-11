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
import { closeProfileDialog, updateInput, resetForm } from 'actions';

// Rest
import RestPoints from 'rest/Init';
import { updateOwnProfile } from 'rest/handleCommonRequests';

// functions
import checkEmptyInputs from 'functions/checkEmptyInputs';

export default class FormDialog extends React.Component {
  //handles formstate and dialog state
  handleClose = () => {
    store.dispatch(resetForm);
    store.dispatch(closeProfileDialog);
  };

  //gets all Skill by traversing the passed skill tree recursive
  getAllSkillsRecursive(skill, allSkills, aktPath) {
    allSkills.push(aktPath);
    skill.subcategories.forEach(subskill => {
      this.getAllSkillsRecursive(subskill, allSkills, aktPath + '/' + subskill.skillname);
    });
    return allSkills;
  }
  //gets the actual level of a passes skill by recursivly traversing the skill tree
  //submits if the skillpath equals the passed skills path
  getaktLevelRecursive(skill, aktPath, path, level) {
    if (aktPath === path) {
      level = skill.level;
      return level;
    }
    skill.subcategories.forEach(subskill => {
      if (
        this.getaktLevelRecursive(subskill, aktPath + '/' + subskill.skillname, path, level) !== 0
      ) {
        level = this.getaktLevelRecursive(
          subskill,
          aktPath + '/' + subskill.skillname,
          path,
          level,
        );
      }
    });
    return level;
  }

  //submits the values of the form as new milestone Object to the backend
  async handleSubmit(milestone) {
    const inputFieldIDs = {
      datum: 'datefield',
      comment: 'textarea',
      skillpath: 'singleselect',
    };

    if (!checkEmptyInputs(milestone, inputFieldIDs)) {
      await updateOwnProfile(RestPoints.milestone, milestone);
      this.handleClose();
    }
  }

  handleChange(id, value) {
    store.dispatch(updateInput(id, value));
  }

  render() {
    const state = store.getState();
    const { showDialog, person, profiles } = state.profile;
    const { datefield, textarea, singleselect } = state.formState;
    var currentProfile = profiles[person];

    var aktSkill = singleselect.value;

    var aktLevel = 0;

    //gets the actual level of a selected skill by recursivly traversing the skill tree
    Object.keys(currentProfile.skills).forEach(index => {
      if (
        this.getaktLevelRecursive(
          currentProfile.skills[index],
          currentProfile.skills[index].skillname,
          singleselect.value,
          0,
        ) > 0
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
      skillpath: aktSkill,
      date: datefield.value,
      level: aktLevel,
      comment: textarea.value,
    };

    var allSkillsOfUser = [];
    //get all skills of the actual user by recursivly travsersing the
    //skill tree /skill => subcategories
    //and always pass the name + "/" to the next depth of the tree
    //this generates the skillpath name => Programming/Python/Flask

    Object.keys(currentProfile.skills).forEach(index => {
      Object.keys(currentProfile.skills[index].subcategories).forEach(subskill => {
        if (allSkillsOfUser.length === 0) {
          allSkillsOfUser = this.getAllSkillsRecursive(
            currentProfile.skills[index].subcategories[subskill],
            [],
            currentProfile.skills[index].skillname +
              '/' +
              currentProfile.skills[index].subcategories[subskill].skillname,
          );
        } else
          allSkillsOfUser.push(
            ...this.getAllSkillsRecursive(
              currentProfile.skills[index].subcategories[subskill],
              [],
              currentProfile.skills[index].skillname +
                '/' +
                currentProfile.skills[index].subcategories[subskill].skillname,
            ),
          );
      });
    });

    //get guidelines from the  actual selected skill
    var guidelines;
    Object.keys(state.allSkills).forEach(key => {
      if (singleselect.value === key) {
        guidelines = state.allSkills[key];
      }
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
            <RadioGroupShowLevel level={aktLevel} guidelines={guidelines} />
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
