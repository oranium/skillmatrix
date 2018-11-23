import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  SkillNameInput, DateInput, TextArea, LevelPicker,
} from './InputFields';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    textAlign: 'left',
  },
});

function Label(props) {
  const { classes, value } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          {value}
        </Typography>
        <Typography component="p">{value}</Typography>
      </Paper>
    </div>
  );
}

Label.propTypes = {
  classes: PropTypes.instanceOf(styles).isRequired,
};

const LabelField = withStyles(styles)(Label);

export default class Form extends Component {
  renderLabels() {
    const { inputs } = this.props;
    const labels = Object.keys(inputs).map((id, i) => (
      <LabelField key={i} name={inputs[id].name} value={inputs[id].value} />
    ));
    console.log(Object.keys(inputs));
    return labels;
  }

  render() {
    const {
      inputs, page, onChange, onReset, onSubmit,
    } = this.props;
    if (page === 'form') {
      return (
        <div className="form">
          <h1>Neuen Skill erstellen</h1>
          <SkillNameInput
            data={inputs.textfield}
            value={inputs.textfield.value}
            onChange={(id, value) => onChange(id, value)}
          />
          <LevelPicker data={inputs.levelfield} onChange={(id, value) => onChange(id, value)} />
          <DateInput
            data={inputs.datefield}
            value={inputs.datefield.value}
            onChange={(id, value) => onChange(id, value)}
          />
          <TextArea
            data={inputs.textarea}
            value={inputs.textarea.value}
            onChange={(id, value) => onChange(id, value)}
          />

          <div className="button-container">
            <Button variant="contained" color="primary" onClick={() => onReset()}>
              Reset Form
            </Button>
            <Button
              variant="contained"
              color="primary"
              name="submit"
              onClick={() => onSubmit('skill')}
            >
              Show skill
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="form">
        {this.renderLabels()}
        <div className="button-container">
          <Button
            variant="contained"
            color="primary"
            name="submit"
            onClick={() => onSubmit('form')}
          >
            Edit skill
          </Button>
        </div>
      </div>
    );
  }
}
