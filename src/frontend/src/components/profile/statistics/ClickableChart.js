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
import MilestoneList from 'components/common/MilestoneList';

// Redux
import Store from 'Store';
import { setOwnProfile, setError } from 'actions';

// Rest
import RestPoints from 'rest/Init';
import RestCom from 'rest/Rest';

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

  async handleDeleteMilestone(milestoneData) {
    const { skillpath } = this.props;
    const confirmation = window.confirm(
      'Are you sure you want to remove this Milestone for ' + skillpath + ' from your profile?',
    );

    // only if user confirms to delete the milestone
    if (confirmation) {
      const milestone = {
        skillpath,
        ...milestoneData,
      };

      const Rest = new RestCom(RestPoints.deleteMilestone, milestone);

      try {
        const updatedProfile = await Rest.post();
        Store.dispatch(setOwnProfile(updatedProfile));
      } catch (e) {
        Store.dispatch(setError(e.message));
      }
    }
  }

  render() {
    const { classes, skillname, milestones } = this.props;

    const milestoneList = Object.keys(milestones).map(key => (
      <MilestoneList
        key={key}
        milestone={milestones[key]}
        deleteMilestone={milestoneData => this.handleDeleteMilestone(milestoneData)}
      />
    ));
    return (
      <div>
        <Card>
          <ButtonBase className={classes.cardAction} onClick={this.handleClickOpen}>
            <CardContent>
              <Chart //render small chart at the Card
                height={200}
                width={300}
                display={false}
                skill={skillname}
                milestones={milestones}
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
          fullWidth
        >
          <Typography variant="h5" component="h2">
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  <Chart //render small chart at the Card
                    height={400}
                    width={800}
                    display={true}
                    skill={skillname}
                    milestones={milestones}
                    enabledZoom={true}
                  />
                </Typography>
                <List>{milestoneList}</List>
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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

ClickableChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClickableChart);
