import React from 'react';
import Button from '@material-ui/core/Button';
import { SearchInput } from './InputFields';

export default function Search(props) {
  const { searchField, onChange, onSearch } = props;
  return (
    <div>
      <h1>Skill Search</h1>
      <form>
        <SearchInput
          data={searchField}
          value={searchField.value}
          onChange={(id, value) => onChange(id, value)}
        />
        <Button variant="contained" color="primary" name="submit" onClick={() => onSearch()}>
          Search
        </Button>
      </form>
    </div>
  );
}
