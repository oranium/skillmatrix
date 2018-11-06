import React from 'react';
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

export const SkillNameInput = withStyles(styles)(
    (props) => {
        const {classes} = props;
        const id = 'textfield';

        return(
            <TextField
                required
                id="outlined-required"
                type = "text"
                label={props.data.name}
                value={props.data.value}
                className={classes.textField + " " + props.data.name}
                error={props.data.error}
                margin="normal"
                variant="outlined"
                onChange={(evt)=>props.onChange(id, evt.target.value)}
            />
        )
    }
);


export const DateInput = withStyles(styles)(
    (props) => {
        const {classes} = props;
        const id = 'datefield';

        return(
            <TextField
                required
                id="outlined-required"
                type = "date"
                label={props.data.name}
                value={props.data.value}
                className={classes.textField + " " + props.data.name}
                error={props.data.error}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(evt)=>props.onChange(id, evt.target.value)}
            />
        )
    }
);

export const TextArea = withStyles(styles)(
    (props) => {
        const {classes} = props;
        const id = 'textarea';

        return(
            <TextField
                required
                multiline
                id="outlined-required"
                type = "date"
                label={props.data.name}
                value={props.data.value}
                className={classes.textField + " " + props.data.name}
                error={props.data.error}
                margin="normal"
                variant="outlined"
                onChange={(evt)=>props.onChange(id, evt.target.value)}
            />
        )
    }
)