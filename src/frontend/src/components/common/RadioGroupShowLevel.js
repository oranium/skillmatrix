// react
import React from 'react';

// material-ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  formControl: {
    margin: '10px',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: String(this.props.level),
  };

  render() {
    const { classes, guidelines } = this.props;
    const numbers = ['1', '2', '3', '4', '5'];
    const rdBtns = numbers.map((num, index) =>
    //set attributes of every single Radio
      num < this.props.level || num > this.props.level ? (
        <FormControlLabel
          key={index}
          value={num}
          control={<Radio />}
          label={num}
          disabled={!this.props.disabled}
        /> //add disabled to the props to disable
      ) : (
        <FormControlLabel
          key={index}
          value={num}
          control={<Radio checked title={guidelines[num]} />}
          label={num}
        />
      ),
    );
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Level: </FormLabel>
          <RadioGroup
            aria-label="Level"
            name="level"
            margin="normal"
            className={classes.group}
            value={this.state.level}
          >
            {rdBtns}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
