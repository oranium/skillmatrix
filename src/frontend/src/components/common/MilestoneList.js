import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import IconButton from '@material-ui/core/IconButton';

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
  const {
    level, comment, date, deleteMilestone,
  } = props;

  return (
    <div className={classes.root} onClick={event => event.stopPropagation()}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{date}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.secondaryHeading}>
          <div>
            <Typography>
              Level:
              {level}
              {' '}
            </Typography>

            <Typography style={{ width: '200%' }}>
              Comment:
              {comment}
            </Typography>
          </div>
          <ExpansionPanelActions style={{ width: '100%', textAlign: 'right' }}>
            <IconButton onClick={() => deleteMilestone(level, date)}>
              <DeleteIcon />
            </IconButton>
          </ExpansionPanelActions>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};
export default withStyles(styles)(MilestoneList);
