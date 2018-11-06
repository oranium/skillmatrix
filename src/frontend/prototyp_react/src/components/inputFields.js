import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
var multiline = false;
var rows = "";
if (props.data.type === 'textarea'){
    multiline = true;
    rows = 5;
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
        error={props.data.error}
        rows = {rows}
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