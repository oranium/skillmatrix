import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function PaperSheet(props) {
  const { classes } = props;
  const { errorMsg } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Error
        </Typography>
        <Typography component="p">{errorMsg}</Typography>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(PaperSheet);
