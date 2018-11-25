import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    textAlign: 'left',
  },
});

function Label(props) {
  const { classes, value } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          {value}
        </Typography>
        <Typography component="p">{value}</Typography>
      </Paper>
    </div>
  );
}

Label.propTypes = {
  classes: PropTypes.instanceOf(styles).isRequired,
};

export default withStyles(styles)(Label);
