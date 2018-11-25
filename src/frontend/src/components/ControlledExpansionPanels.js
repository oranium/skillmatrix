import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Panel from './Panel';

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
  const { classes, results } = props;

  const panels = Object.keys(results).map((username, i) => (
    <Panel
      key={i}
      id={i}
      username={username}
      level={results[username]}
      onChange={() => console.log('test')}
    />
  ));

  return <div className={classes.root}>{panels}</div>;
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
