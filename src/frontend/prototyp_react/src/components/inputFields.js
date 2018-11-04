import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Input } from '@material-ui/core';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: "500px",
    }
  });

function InputField(props) {
const {classes} = props;
var multiline = "";
if (props.data.type === 'textarea'){
    multiline = true;
}
var InputLabelProps = {};
if (props.data.type === 'date') {
    InputLabelProps={
        shrink: true,
      }
}

return (
    <TextField
        required
        id="outlined-required"
        type={props.data.type}
        label={props.data.name}
        defaultValue={props.data.value}
        className={classes.textField + " " + props.data.name}
        multiline={multiline}
        margin="normal"
        variant="outlined"
        InputLabelProps={InputLabelProps}
        onChange={(evt)=>props.onChange(evt.target.value, props.index)}
    />
    )
}

InputField.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(InputField);