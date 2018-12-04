import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SearchField from 'components/search/SearchField';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '500px',
    margin: '2em auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

function Search(props) {
  const { classes, onSearch } = props;
  return (
    <div className={classes.root}>
      <h1>Skill Search</h1>
      <form onSubmit={onSearch}>
        <SearchField />
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          name="submit"
        >
          Search
          <SearchIcon className={classes.rightIcon} />
        </Button>
      </form>
    </div>
  );
}

export default withStyles(styles)(Search);
