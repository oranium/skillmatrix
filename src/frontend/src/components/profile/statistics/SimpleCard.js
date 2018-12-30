import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import Chart from './Chart';
import MilestoneList from '../../common/MilestoneList';

const styles = theme => ({
  root: {
    height: 180,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  container: {
    display: 'flex',
  },
});

export class ClickableChart extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    const milestones = Object.keys(classes.data).map(key => (
      <MilestoneList
        datum={classes.data[key].date}
        level={classes.data[key].level}
        comment={classes.data[key].comment}
      />
    ));
    return (
      <div>
        <Card>
          <ButtonBase className={this.props.classes.cardAction} onClick={this.handleClickOpen}>
            <CardContent>
              <Chart //render small chart at the Card
                height={200}
                width={300}
                display={false}
                skill={this.props.skill}
                data={classes.data}
                enabledZoom={false}
              />
            </CardContent>
          </ButtonBase>
        </Card>
        <Dialog
          className={classes.card}
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <Typography variant="h5" component="h2">
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  <Chart //render small chart at the Card
                    height={400}
                    width={800}
                    display={true}
                    skill={this.props.skill}
                    data={classes.data}
                    enabledZoom={true}
                  />
                </Typography>
                <List>{milestones}</List>
              </CardContent>
            </Card>
          </Typography>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <div />
      </div>
    );
  }
}

//SimpleCard renders one Clickable Chart
function SimpleCard(props) {
  return <ClickableChart skill={props.skill} classes={props} />;
}
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
