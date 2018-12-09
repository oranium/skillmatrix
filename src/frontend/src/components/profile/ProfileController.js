// react
import React, { Component } from 'react';

// redux
import store from 'Store';
import { changeView, openProfileDialog, switchPage, setOwnProfile, setError } from 'actions';

// react components
import TabContainer from 'components/profile/TabContainer';
import SkillProfileList from 'components/profile/skills/SkillProfileList';
import SkillStatisticsGrid from 'components/profile/statistics/SkillStatisticsGrid';
import NewMilestoneDialog from 'components/profile/skills/NewMilestoneDialog';
import NewSkillDialog from 'components/profile/skills/NewSkillDialog';

// material-ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { ArrowLeft, Search } from '@material-ui/icons';

// Rest
import RestPoints from 'rest/Init';
import RestCom from 'rest/Rest';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  goBackButton: {
    position: 'static',
    display: 'block',
    margin: '10px',
  }
});

class ProfileController extends Component {
  localUpdate = [];

  async applyLevelUpdates(skills) {
    const { state } = this.props;
    const { person } = state.profile;
    const { username } = state.profile.profiles[person];
    var latestChanges = { username, skills: [{ skill: '', level: 0 }] };
    var alreadyUpdated = [];
    console.log(this.localUpdate);
    Object.keys(skills).map(index => {
      Object.keys(this.localUpdate).map(idx => {
        if (skills[index].skillname === this.localUpdate[idx][0].skill) {
          alreadyUpdated.push(this.localUpdate[idx][0].skill);
          latestChanges.skills.push({
            [this.localUpdate[idx][0].skill]: this.localUpdate[idx][0].level,
          });
        }
      });
    });
    latestChanges.skills.shift();

    // send skill
    let Rest = new RestCom(RestPoints.skill, JSON.stringify(latestChanges));
    //todo remove JSON.stringify
    try {
      const { data } = await Rest.post();
      store.dispatch(setOwnProfile(data));
    } catch (e) {
      store.dispatch(setError(e.message));
    }

    console.log(latestChanges);

    this.localUpdate = [];
    delete latestChanges[skills];
  };

  handleLevelChange = (skill, level) => {
    this.localUpdate.push([{ skill, level }]);
  };

  getOwnerArticle() {
    const { state } = this.props;
    const { person, isEditable } = state.profile;
    const { username } = state.profile.profiles[person];

    if (isEditable) {
      return 'My ';
    }

    return username + "'s ";
  }

  handleChange = (evt, value) => {
    store.dispatch(changeView(value));
  };

  handleNewSkill = () => {
    store.dispatch(openProfileDialog('skill'));
  };

  handleNewMilestone = () => {
    console.log('NewMilestone');
  };

  openNewMilestoneDialog = () => {
    store.dispatch(openProfileDialog('milestone'));
  };

  switchToSearchPage = () => {
    store.dispatch(switchPage('search'));
  }

  render() {
    const { state, classes } = this.props;
    // person: array index in profiles
    const { person, profiles, view, showDialog, isEditable } = state.profile;
    const skills = profiles[person].skills;
    const copy = skills.slice();
    const ownerArticle = this.getOwnerArticle();

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={view} onChange={this.handleChange} centered fullWidth>
            <Tab label={ownerArticle + 'Profile'} />
            <Tab label={ownerArticle + 'Statistics'} />
          </Tabs>
        </AppBar>
        {!isEditable && (<IconButton
          className={classes.goBackButton}
          onClick={this.switchToSearchPage}
          color="inherit"
          aria-label="Go Back"
        >
          <ArrowLeft/>
          <Search/>
        </IconButton>)}
        <div>
        {view === 0 && (
          <TabContainer>
            <SkillProfileList categories={skills} levelChange={this.handleLevelChange} />

            {isEditable && (
              <div>
                <NewMilestoneDialog open={showDialog === 'milestone'} />
                <NewSkillDialog />
                <div className="button-container">
                  <Button variant="contained" color="primary" onClick={this.openNewMilestoneDialog}>
                    New Milestone
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    name="submit"
                    onClick={this.handleNewSkill}
                  >
                    New Skill
                  </Button>
                  <Button
                    name="bla"
                    variant="contained"
                    color="primary"
                    onClick={this.applyLevelUpdates.bind(this, copy)}
                  >
                    Apply Changes
                  </Button>
                </div>
              </div>
            )}
          </TabContainer>
        )}
        {view === 1 && (
          <TabContainer>
            <SkillStatisticsGrid categories={skills} />
          </TabContainer>
        )}
        </div>
      </div>
    );
  }
}

ProfileController.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileController);
