// react
import React, { Component } from 'react';

// react components
import SearchForm from '../components/SearchForm';
import ControlledExpansionPanels from '../components/ControlledExpansionPanels';

// redux
import store from '../Store';
import { setError, setSearchResults, showSearchResults } from '../actions';

// Rest
import RestPoints from '../rest/Init';
import RestCom from '../rest/Rest';

class SearchController extends Component {
  // get results for query when user clicks on search button and store them into state
  async handleSearch() {
    const { state } = this.props;
    const { user } = state;
    const { value } = state.formState.searchfield;
    const search = {
      username: user,
      query: value,
    };
    const Rest = new RestCom(RestPoints.search, JSON.stringify(search));
    try {
      const { data } = await Rest.post();
      const { result } = data;
      // store results into state
      store.dispatch(setSearchResults(result));
      // show results to user
      store.dispatch(showSearchResults);
    } catch (e) {
      store.dispatch(setError(e.message));
      console.log(e);
    }
  }

  render() {
    const { state, onChange } = this.props;
    const { searchResults, formState } = state;
    const { showResults, results } = searchResults;
    return (
      <div>
        <SearchForm
          searchField={formState.searchfield}
          onChange={(id, value) => onChange(id, value)}
          onSearch={() => this.handleSearch()}
        />
        {showResults && <ControlledExpansionPanels results={results} />}
      </div>
    );
  }
}

export default SearchController;
