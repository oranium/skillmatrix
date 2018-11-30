import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// redux
import store from '../Store';
import { hideErrorDialog, setError } from '../actions';

class AlertDialog extends React.Component {
  static openErrorDialog = msg => {
    store.dispatch(setError(msg));
  };

  static handleClose = () => {
    store.dispatch(hideErrorDialog);
  };

  render() {
    const { state } = this.props;
    const { error } = state;
    const { hasError, message } = error;
    return (
      <div>
        <Dialog
          open={hasError}
          onClose={this.constructor.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'An Error occured!'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.constructor.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
