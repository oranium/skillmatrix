import React from 'react';
import ProfileExpansionPanel from 'components/profile/skills/ProfileExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  panels: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'stretch',
    flexBasis: '99%',
  },
});

function sortDatastructureRecursive(subcategories, props) {
  if (subcategories === undefined) return <div />;
  const subs = subcategories.map(skill => (
    <div classname={props.classes.panelsInside}>
      <ProfileExpansionPanel
        skill={skill}
        summary={sortDatastructureRecursive(skill.subcategories, props)}
        levelChange={props.levelChange}
        isEditable={props.isEditable}
      />
    </div>
  ));

  return subs;
}

class SkillProfileList extends React.Component {
  state = {
    expanded: null,
  };
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  render() {
    const { categories } = this.props;
    const { classes } = this.props;
    const { expanded } = this.state;

    const panels = categories.map(skill => (
      <ExpansionPanel expanded={expanded} onChange={this.handleChange(this.props.skill)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {' '}
          {skill.skillname}{' '}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ExpansionPanelActions className={classes.panels}>
            {sortDatastructureRecursive(skill.subcategories, this.props)}
          </ExpansionPanelActions>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));
    return panels;
  }
}

SkillProfileList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SkillProfileList);
