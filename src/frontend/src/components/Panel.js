import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

function Panel(props) {
  const {
    classes, onChange, id, isExpanded, username, level,
  } = props;

  console.log(props);
  return (
    <ExpansionPanel
      expanded={isExpanded}
      onChange={(expanded) => {
        onChange(id);
        console.log(id);
        console.log(`exp ${expanded}`);
      }}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>{username}</Typography>
        <Typography className={classes.secondaryHeading}>{`Level: ${level}`}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus
          est, id dignissim quam.
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

Panel.propTypes = {
  classes: PropTypes.instanceOf(styles).isRequired,
};

export default withStyles(styles)(Panel);
