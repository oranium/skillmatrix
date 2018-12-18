import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import IconButton from '@material-ui/core/IconButton';

import Grid from '@material-ui/core/Grid';

import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

const MilestoneList = (props) => {
  const classes = { props };

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{props.datum}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.secondaryHeading}>
          <div>
            <Typography>
              Level:
              {props.level}
              {' '}
            </Typography>

            <Typography style={{ width: '200%' }}>
              Comment:
              {props.comment}
            </Typography>
          </div>
          <ExpansionPanelActions style={{ width: '100%', textAlign: 'right' }}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </ExpansionPanelActions>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};
export default withStyles(styles)(MilestoneList);
