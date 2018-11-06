import React, {Component} from 'react';
import InputField from './InputFields';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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
    renderInputFields(){
        let inputs = 
            this.props.inputs.map(
                (input, i) => (<InputField  key={i} index={i} data={input} onChange={(value, i) => this.props.onChange(value, i)}/>) 
            )
        return inputs;
    }
    renderLabels(){
        let labels = 
            this.props.inputs.map(
                (input, i) => (<LabelField key={i} index={i} name={input.name} value={input.value}/>)
            )
        return labels;
    }
  render(){
      if (this.props.page === "form"){
          return(
            <div className="form">
            {this.renderInputFields()}
            <div className="button-container">
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