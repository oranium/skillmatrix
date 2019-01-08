// react
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import { DateInput, TextArea, LevelPicker } from 'components/common/InputFields';
import SingleSelect from 'components/common/SingleSelect';

// material-ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Card from '@material-ui/core/Card';

// redux
import store from 'Store';
import { closeProfileDialog, updateInput, resetForm, setOwnProfile, setError } from 'actions';

// Rest
import RestPoints from 'rest/Init';
import RestCom from 'rest/Rest';
import { updateAllSkills } from 'rest/handleCommonRequests';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 0,
  },
  dialogcontent: {
    fullWidth: true,
    maxWidth: 'none',
  },
});

class FormDialog extends Component {
  state = {
    open: false,
    skillname: '',
    guideline: {
      '1': 'Insufficient',
      '2': 'Sufficient/Below Average',
      '3': 'Satisfactory / Average',
      '4': 'Good',
      '5': 'Excellent',
    },
  };

  handleChange = event => {
    this.setState({
      skillname: event.target.value,
    });
  };

  handleGuidelineChange(level, event) {
    this.state.guideline[level] = event.target.value;
  }

  handleClose = () => {
    store.dispatch(resetForm);
    store.dispatch(closeProfileDialog);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClickClose = () => {
    this.setState({ open: false });
  };

  async handleSubmit(Skill) {
    //todo API
    var category = store.getState().formState.singleselect.value;
    const { user } = store.getState();
    const { username } = user;

    const request = {
      username,
      category,
      ...this.state,
    };
    console.log(request);

    const Rest = new RestCom(RestPoints.createSkill, JSON.stringify(request));

    try {
      await Rest.post();
    } catch (e) {
      store.dispatch(setError(e.message));
    }
    this.handleClickClose();
    this.handleClose();

    await updateAllSkills();
  }
  render() {
    const state = store.getState();

    const { allSkills, allCategories } = state;

    var tmpAllSkills = [];
    Object.keys(allSkills).map(key => {
      tmpAllSkills.push(key);
    });

    const skillList = [...tmpAllSkills, ...allCategories];

    const { showDialog } = state.profile;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Dialog
          fullWidth
          open={showDialog === 'newSkill'}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div className={classes.dialog}>
            <DialogTitle id="form-dialog-title">New skill</DialogTitle>
            <DialogContent>
              <DialogContentText className={classes.dialogcontent}>
                To add a new Skill please fill in all inputfields.
              </DialogContentText>

              <SingleSelect
                placeholder={'Choose the category of your skill'}
                allSkills={skillList}
                fullWidth
              />

              <TextField
                id="outlined-with-placeholder"
                label="skill name"
                placeholder="write the skill to add"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={event => this.handleChange(event)}
                fullWidth
              />
              <Card>
                <List
                  component="nav"
                  subheader={
                    <ListSubheader component="div">
                      (Optional) add guideline to the skill
                    </ListSubheader>
                  }
                >
                  <ListItem>
                    <TextField
                      label="Level 1: "
                      id="level1"
                      className={classNames(classes.margin, classes.textField)}
                      placeholder={this.state.guideline['1']}
                      onChange={event => this.handleGuidelineChange('1', event)}
                      fullWidth
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      label="Level 2"
                      id="level2"
                      className={classNames(classes.margin, classes.textField)}
                      placeholder={this.state.guideline['2']}
                      onChange={event => this.handleGuidelineChange('2', event)}
                      fullWidth
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      label="Level 3: "
                      id="level3"
                      className={classNames(classes.margin, classes.textField)}
                      placeholder={this.state.guideline['3']}
                      onChange={event => this.handleGuidelineChange('3', event)}
                      fullWidth
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      label="Level 4: "
                      id="level4"
                      className={classNames(classes.margin, classes.textField)}
                      placeholder={this.state.guideline['4']}
                      onChange={event => this.handleGuidelineChange('4', event)}
                      fullWidth
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      label="Level 5: "
                      id="level5"
                      className={classNames(classes.margin, classes.textField)}
                      placeholder={this.state.guideline['5']}
                      onChange={event => this.handleGuidelineChange('5', event)}
                      fullWidth
                    />
                  </ListItem>
                </List>
              </Card>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              {store.getState().formState.singleselect.value.length == 0 ? (
                <Button onClick={() => this.handleClickOpen()} color="primary">
                  Submit
                </Button>
              ) : (
                <Button onClick={() => this.handleSubmit(true)} color="primary">
                  Submit
                </Button>
              )}
            </DialogActions>
          </div>
        </Dialog>
        <div className="confirm-dialog">
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Are you sure you want to add "' + this.state.skillname + '" as a new category?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You didn't choose a category. This means you will add the skill as new main category
                which has no attributes.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClickClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => this.handleSubmit(true)} color="primary" autoFocus>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}
FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormDialog);
