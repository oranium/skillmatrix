// react
import React from 'react';

import ClickableChart from 'components/profile/statistics/ClickableChart';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

class SkillStatisticsPage extends React.Component {
  state = {
    expanded: null,
  };

  //handle open/close expansion panel
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  //render recursive the subcategories into the ExpansionPanel details of root categories
  //ends if there are no more subcategories
  //actual chart is set on the expansion panel summary
  renderDatastructureRecursive(subcategories, index) {
    const { expanded } = this.state;

    const subs = subcategories.map(skill =>
      skill.subcategories.length !== 0 ? (
        <ExpansionPanel
          key={skill.skillpath}
          expanded={expanded}
          onChange={this.handleChange(this.props.skill)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <ClickableChart
              skillpath={skill.skillpath}
              skillname={skill.skillname}
              milestones={skill.milestones}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={this.props.classes.panels}>
            {this.renderDatastructureRecursive(skill.subcategories, index + 1)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ) : (
        <ExpansionPanel key={skill.skillpath}>
          <ExpansionPanelSummary>
            <ClickableChart
              skillpath={skill.skillpath}
              skillname={skill.skillname}
              milestones={skill.milestones}
            />
          </ExpansionPanelSummary>
        </ExpansionPanel>
      ),
    );

    return subs;
  }

  //render root categories and call renderDatastructureRecursive to render all subcategories
  render() {
    const { expanded } = this.state;

    const { categories } = this.props;
    const skillItems = categories.map(skill => (
      <ExpansionPanel
        key={skill.skillpath}
        expanded={expanded}
        onChange={this.handleChange(this.props.skill)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {' '}
          {skill.skillname}{' '}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={this.props.classes.panels}>
          {this.renderDatastructureRecursive(skill.subcategories, 0)}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));

    return <div>{skillItems}</div>;
  }
}

SkillStatisticsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SkillStatisticsPage);
