import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '500px',
  },
  error: {
    color: 'red',
  },
};

export const SkillNameInput = withStyles(styles)((props) => {
  const { classes } = props;
  const id = 'textfield';

  return (
    <TextField
      required
      id="outlined-required"
      type="text"
      label={props.data.name}
      value={props.data.value}
      className={`${classes.textField} ${props.data.name}`}
      error={props.data.error}
      margin="normal"
      variant="outlined"
      onChange={evt => props.onChange(id, evt.target.value)}
    />
  );
});

export const SearchInput = withStyles(styles)((props) => {
  const { classes } = props;
  const id = 'searchfield';

  return (
    <TextField
      required
      id="outlined-required"
      type="text"
      label={props.data.name}
      value={props.data.value}
      className={`${classes.textField} ${props.data.name}`}
      error={props.data.error}
      margin="normal"
      variant="outlined"
      onChange={evt => props.onChange(id, evt.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
});

export const DateInput = withStyles(styles)((props) => {
  const { classes } = props;
  const id = 'datefield';
  const heute = new Date();
  var month = heute.getMonth() + 1
  var day = heute.getDate()

  if(day < 10 ) day = "0" + day;
  if(month < 10 ) month = "0" + month
  
  const heuteString= heute.getFullYear() + "-" + month + "-" + day;
  var value;
  if(props.data.value.length === 0) value = heuteString
  else value = props.data.value;
  return (
    <TextField
      required
      id="outlined-required"
      type="date"
      label={props.data.name}
      value={ value }
      className={`${classes.textField} ${props.data.name}`}
      error={props.data.error}
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      onChange={evt => props.onChange(id, evt.target.value)}
    />
  );
});

export const TextArea = withStyles(styles)((props) => {
  const { classes } = props;
  const id = 'textarea';

  return (
    <TextField
      required
      multiline
      rows="4"
      label={props.data.name}
      value={props.data.value}
      className={`${classes.textField} ${props.data.name}`}
      error={props.data.error}
      margin="normal"
      variant="outlined"
      onChange={evt => props.onChange(id, evt.target.value)}
    />
  );
});

export const LevelPicker = withStyles(styles)((props) => {
  const { classes } = props;
  const id = 'levelfield';
  const numbers = ['1', '2', '3', '4', '5'];
  let className = '';

  if (props.data.error) {
    className = classes.error;
  }

  const radioBtns = numbers.map((value, i) => (
    <Radio
      key={i}
      checked={props.data.value === value}
      onChange={evt => props.onChange(id, evt.target.value)}
      value={value}
      aria-label={`Level ${value}`}
      title={`Level ${value}`}
      className={className}
    />
  ));
  return <div className={`${classes.textField} ${classes.levelPicker}`}>{radioBtns}</div>;
});
