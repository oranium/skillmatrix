import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Panel from 'components/search/Panel';

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

  const panels = results.map((user, i) => (
    <Panel key={i} id={i} username={user.username} skills={user.skills} />
  ));

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
