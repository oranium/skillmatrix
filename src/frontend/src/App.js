import App from './App'
import React, { Component } from 'react';

class SearchInput extends Component {
    
    handleSubmit = event => {event.preventDefault()}

    render() {
        return (
        <form onSubmit = {this.handleSubmit}>
            <label>Search request:
            </label>
            <p/>
            <input type='text'/>
            <p/>
            <button type='search'>
                 Search
            </button>
        </form> 
        );
  }
}

export default SearchInput
