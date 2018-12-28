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
  root: { left: 100 },

  group: {
    flexDirection: 'row',
  },
});

class RadioButtonsGroup extends React.Component {
  //Alle Changes RadioButtons müssen noch in State gespeichert werden

  state = {
    value: String(this.props.level),
  };

  handleChange = event => {
    this.props.levelChange(this.props.skill, parseInt(event.target.value));
    this.setState({ value: event.target.value });
    // const skillUpdate = { skill: this.props.skill, level: event.target.value };
    // store.dispatch(updateSkills(skillUpdate));
  };

  render() {
    const { classes } = this.props;
    const numbers = ['1', '2', '3', '4', '5'];
    const rdBtns = numbers.map((num, index) =>
      num < this.props.level || num > this.props.level ? (
        <FormControlLabel
          key={index}
          value={num}
          control={<Radio />}
          label={num}
          disabled={!this.props.disabled}
        /> //add disabled to the props to disable
      ) : (
        <FormControlLabel key={index} value={num} control={<Radio />} label={num} />
      ),
    );
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="Level"
            name="level"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
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
