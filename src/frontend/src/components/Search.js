import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { SearchInput } from './InputFields';
import Panel from './ControlledExpansionPanels';

const styles = theme => ({
  root: {
    width: '500px',
    margin: '2em auto',
  },
  button: {
    displax: 'block',
    width: '100%',
    marginTop: '2em',
  },
});

function Search(props) {
  const {
    classes, searchField, onChange, onSearch,
  } = props;
  return (
    <div className={classes.root}>
      <h1>Skill Search</h1>
      <form>
        <SearchInput
          data={searchField}
          value={searchField.value}
          onChange={(id, value) => onChange(id, value)}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          name="submit"
          onClick={() => onSearch()}
        >
          Search
        </Button>
      </form>
      <Panel />
    </div>
  );
}

export default withStyles(styles)(Search);
