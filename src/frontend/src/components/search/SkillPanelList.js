import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SkillPanel from 'components/search/SkillPanel';

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
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

function ControlledExpansionPanels(props) {
  const { classes, results, heading } = props;
  let panels;
  if (results.length === 0) {
    panels = 'No Users found.';
  } else {
    panels = results.map((user, i) => (
      <SkillPanel key={user.username} id={i} username={user.username} skills={user.skills} />
    ));
  }

  return (
    <div className={classes.root}>
      <h2>{heading}</h2>
      {panels}
    </div>
  );
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
