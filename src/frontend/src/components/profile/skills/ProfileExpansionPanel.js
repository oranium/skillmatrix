//react
import React from 'react';

// material-ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import RadioGroup from '../../common/RadioGroup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

// redux
import Store from 'Store';
import { setError, setOwnProfile } from 'actions';

// Rest
import RestPoints from 'rest/Init';
import RestCom from 'rest/Rest';

const styles = theme => ({
  left: {
    width: '35%',
    height: '80px',
  },
  right: { width: '50%', alignSelf: 'flex-end' },
  headingButton: { display: 'inline-block', width: '80%' },
  removeButton: { display: 'inline-block', width: '20%' },
  noFlex: {
    display: 'block',
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

  getGuidelines(skillname, allSkills) {
    if (skillname in allSkills) return allSkills[skillname];
  }

  async handleRemoveSkill(event, skillToRemove) {
    event.stopPropagation();
    const confirmation = window.confirm(
      'Are you sure you want to remove ' + skillToRemove + ' from your skill list?',
    );

    // only if user confirms deletion
    if (confirmation) {
      // Api request to delete skill from own skilllist
      const request = {
        skillpath: skillToRemove,
        forAll: false,
      };

      const Rest = new RestCom(RestPoints.deleteSkill, request);
      //todo remove stringify

      try {
        const updatedProfile = await Rest.post();
        Store.dispatch(setOwnProfile(updatedProfile));
      } catch (e) {
        Store.dispatch(setError(e.message));
      }
    }
  }

  render() {
    const { classes, skill, summary } = this.props;
    const { skillname, level, skillpath } = skill;
    const { expanded } = this.state;
    const { allSkills } = Store.getState();
    const guidelines = this.getGuidelines(skillpath, allSkills);

    // skill leaves in the tree should not be opened and have no sub categories
    const hasSubCategories = summary.length !== 0;

    const onChangeProp = {};
    if (hasSubCategories) {
      onChangeProp['onChange'] = this.handleChange(skill);
    }

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === skill} {...onChangeProp}>
          <ExpansionPanelSummary
            className={classes.wrap}
            expandIcon={hasSubCategories && <ExpandMoreIcon />}
          >
            <div className={classes.left}>
              <div className={classes.headingButton}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ textTransform: 'none' }}
                  fullWidth
                >
                  {skillname}
                </Button>
              </div>
              <div className={classes.removeButton}>
                <IconButton
                  title={'Delete ' + skillname}
                  onClick={event => this.handleRemoveSkill(event, skillpath)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
            <div className={classes.right} onClick={event => event.stopPropagation()}>
              <RadioGroup
                className={classes.radioGroup}
                level={level}
                skill={skillpath}
                levelChange={this.props.levelChange}
                disabled={this.props.isEditable}
                guidelines={guidelines}
              />
            </div>
          </ExpansionPanelSummary>
          {hasSubCategories && (
            <ExpansionPanelDetails className={classes.noFlex}>
              {this.props.summary}
            </ExpansionPanelDetails>
          )}
        </ExpansionPanel>
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
