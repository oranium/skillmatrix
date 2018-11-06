import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {SkillNameInput, DateInput, TextArea, LevelPicker} from './InputFields';

const styles = theme => ({
    root: {
      padding: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit,
      textAlign: "left",
    },
  });

function Label(props){
    const {classes} = props;

    return (
    <div>
    <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
        {props.value}
        </Typography>
        <Typography component="p">
        {props.name}
        </Typography>
    </Paper>
    </div>
    )
}

Label.propTypes = {
    classes: PropTypes.object.isRequired,
};

const LabelField = withStyles(styles)(Label);

export default class Form extends Component {
    renderLabels(){
        let labels = 
            Object.keys(this.props.inputs).map(
                (id, i) => (<LabelField key={i} name={this.props.inputs[id].name} value={this.props.inputs[id].value}/>)
            )
        console.log(Object.keys(this.props.inputs));
        return labels;
    }
  render(){
      if (this.props.page === "form"){
          return(
            <div className="form">
            
            <SkillNameInput data={this.props.inputs.textfield} value={this.props.inputs.textfield.value} onChange={(id, value) => this.props.onChange(id, value)}/>
            <LevelPicker data={this.props.inputs.levelfield} onChange={(id, value) => this.props.onChange(id, value)}/>
            <DateInput data={this.props.inputs.datefield} value={this.props.inputs.datefield.value} onChange={(id, value) => this.props.onChange(id, value)}/>
            <TextArea data={this.props.inputs.textarea} value={this.props.inputs.textarea.value} onChange={(id, value) => this.props.onChange(id, value)}/>
            
            <div className="button-container">
                <Button variant="contained" color="primary" onClick={() => this.props.onReset()}>
                    Reset Form
                </Button>
                <Button variant="contained" color="primary" name="submit" onClick={() => this.props.onSubmit("skill")}>
                    Show skill
                </Button>
                
            </div>
            </div>
           )
      }else{
        return(
            <div className="form">
            {this.renderLabels()}
            <div className="button-container">
                <Button variant="contained" color="primary" name="submit" onClick={() => this.props.onSubmit("form")}>
                    Edit skill
                </Button>
            </div>
            </div>
        );
      }
  }
}