//react
import React from 'react';

// material-ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import RadioGroup from '../../common/RadioGroup';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
  },
});

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null,
  };
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes, skill } = this.props;
    const { skillname, level, milestones } = skill;
    const { expanded } = this.state;
    const latestMilestone =
      milestones.length < 1 ? ': -' : ` (${milestones[0].date}): ${milestones[0].comment}`;
    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === this.props.skill}
          onChange={this.handleChange(this.props.skill)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.Heading}>{skillname}</Typography>
            <Typography className={classes.secondaryHeading}> </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <RadioGroup
                level={level}
                skill={skillname}
                levelChange={this.props.levelChange}
                disabled={this.props.isEditable}
              />
              {'Latest Milestone' + latestMilestone}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
