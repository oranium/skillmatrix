import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { SearchInput } from 'components/common/InputFields';

const styles = () => ({
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
    </div>
  );
}

export default withStyles(styles)(Search);
