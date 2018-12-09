import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SkillPanel from 'components/search/SkillPanel';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

// redux
import store from 'Store';
import { changeProfileOwner, switchPage } from 'actions';

const styles = theme => ({
  root: {
    width: '500px',
    margin: '2em auto',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    float: 'left',
  },
});

class Panel extends Component {
  handleViewProfile = () => {
    const { username } = this.props;
    const { profile } = store.getState();
    // gets the index of the profile the user wants to look at
    const person = profile.profiles.findIndex((element, index) => {
      return element.username === username;
    });
    store.dispatch(changeProfileOwner(person));
    store.dispatch(switchPage('profile'));
  };

  render() {
    const { classes, isExpanded, username, skills } = this.props;
    console.table(skills);

    const levelList = skills.map(
      (skill, i) => `${skill.skillname}: level ${skill.level} ${skills[i + 1] ? ', ' : ''}`,
    );
    const skillsTest = [
      {
        skillname: 'skillname',
        milestones: [
          { comment: 'sdfdsf', date: '05.12.18' },
          { comment: 'sdfdsf', date: '05.12.18' },
        ],
      },
      {
        skillname: 'skillname',
        milestones: [
          { comment: 'sdfdsf', date: '05.12.18' },
          { comment: 'sdfdsf', date: '05.12.18' },
        ],
      },
    ];
    const milestones = [];
    skillsTest.forEach(skill => {
      milestones.push(...skill.milestones);
    });
    console.table(milestones);
    return (
      <ExpansionPanel expanded={isExpanded}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Avatar>{username[0]}</Avatar>
          <Typography className={classes.heading}>{username}</Typography>
          <Typography className={classes.secondaryHeading}>{levelList}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Latest Milestone
            {milestones.length > 0 ? ` (${milestones[0].date}): ${milestones[0].comment} ` : ': -'}
          </Typography>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small" color="primary" onClick={this.handleViewProfile}>
            View Profile
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(Panel);
