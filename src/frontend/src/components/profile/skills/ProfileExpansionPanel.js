//react
import React from 'react';

//redux
import store from 'Store';

// material-ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import RadioGroup from '../../common/RadioGroup';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  heading: {
    display: 'flex',
    flexDirection: 'column',
  },

  secondaryHeading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'stretch',
    flexBasis: '99%',
    color: theme.palette.text.secondary,
  },
  row: { width: '320%' },
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

  getGuidelines(skillname, allSkills) {
      if (skillname in allSkills) return allSkills[skillname];
    
  }

  render() {
    const { classes, skill } = this.props;
    const { skillname, level, milestones, skillpath } = skill;
    const { expanded } = this.state;
    const latestElement = milestones.length - 1;
    const { allSkills } = store.getState();
    const guidelines = this.getGuidelines(skillpath, allSkills);
    const latestMilestone =
      milestones.length < 1
        ? ': -'
        : ` (${milestones[latestElement].date}): ${milestones[latestElement].comment}`;
    return (
      <div className={classes.root}>
        {this.props.summary.length !== 0 ? (
          <ExpansionPanel
            expanded={expanded === this.props.skill}
            onChange={this.handleChange(this.props.skill)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.Heading}>
                <div>
                  <div>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ textTransform: 'none' }}
                      fullWidth
                    >
                      {skillname}
                    </Button>
                  </div>
                  <div className={classes.row} onClick={event => event.stopPropagation()}>
                    <RadioGroup
                      level={level}
                      skill={skillpath}
                      levelChange={this.props.levelChange}
                      disabled={this.props.isEditable}
                      guidelines={guidelines}
                    />
                  </div>
                </div>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.secondaryHeading}>
              {' '}
              {this.props.summary}
              {/* <Typography>{'Latest Milestone' + latestMilestone}</Typography> */}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ) : (
          <ExpansionPanel>
            <ExpansionPanelSummary>
              <Typography className={classes.Heading}>
                <div>
                  <div>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ textTransform: 'none' }}
                      fullWidth
                    >
                      {skillname}
                    </Button>
                  </div>
                  <div className={classes.row} onClick={event => event.stopPropagation()}>
                    <RadioGroup
                      level={level}
                      skill={skillpath}
                      levelChange={this.props.levelChange}
                      disabled={this.props.isEditable}
                      guidelines={guidelines}
                    />
                  </div>
                </div>
              </Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>
        )}
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
