import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DateInput, TextArea, LevelPicker } from 'components/common/InputFields';
import MultiSelect from 'components/common/MultiSelect';

// redux
import store from 'Store';
import { changeView, openProfileDialog, closeProfileDialog } from 'actions';

export default class FormDialog extends React.Component {
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    store.dispatch(closeProfileDialog);
  };

  handleSubmit = () => {
    console.log('submit');
    this.handleClose();
  };

  render() {
    const state = store.getState();
    const { showDialog } = state.profile;
    const { datefield, textarea, levelfield } = state.formState;
    return (
      <div>
        <Dialog open={showDialog === 'milestone'} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New milestone</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <MultiSelect />
            <DateInput data={datefield} />
            <TextArea data={textarea} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
