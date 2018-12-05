import React from 'react';
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

function Panel(props) {
  const {
    classes, isExpanded, username, skills,
  } = props;
  console.log(skills);

  const levelList = skills.map(
    (skill, i) => `${skill.skillname}: level ${skill.level} ${skills[i + 1] ? ', ' : ''}`,
  );
  return (
    <ExpansionPanel expanded={isExpanded}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Avatar>{username[0]}</Avatar>
        <Typography className={classes.heading}>{username}</Typography>
        <Typography className={classes.secondaryHeading}>{levelList}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>Latest Milestone: -</Typography>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button size="small" color="primary">
          View Profile
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

export default withStyles(styles)(Panel);
