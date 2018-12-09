// react
import React, { Component } from 'react';

// react components
import SearchForm from 'components/search/SearchForm';
import ControlledExpansionPanels from 'components/common/ControlledExpansionPanels';

// redux
import store from 'Store';
import { setError, setSearchResults, showSearchResults, setSearchError } from 'actions';

// Rest
import RestPoints from 'rest/Init';
import RestCom from 'rest/Rest';
import { addProfiles } from 'actions';


class SearchController extends Component {
  // build query object for api request
  getSearchQuery = searchValues => {
    const query = {};
    // put each search value as key into map
    // 1 => min Level
    searchValues.forEach(tag => {
      query[tag.value] = 1;
    });
    return query;
  };

  storeAllProfiles = results => {
    const { has_all, has_some } = results;
    const allProfiles = [...has_all, ...has_some];
    console.log(allProfiles);
    store.dispatch(addProfiles(allProfiles));
  };

  storeSearchResults = data => {
    const { query, results } = data;
    const { has_all, has_some } = results;
    // add all profiles to profile array

    // build map from skills that only match query
    let searchResults = {
      hasAll: [],
      hasSome: [],
    };
    has_all.forEach(profile => {
      const { skills } = profile;
      const searchSkills = [];
      skills.forEach(skill => {
        if (query.hasOwnProperty(skill.skillname)) {
          searchSkills.push(skill);
        }
      });
      searchResults.hasAll.push({ ...profile, skills: searchSkills });
    });

    has_some.forEach(profile => {
      const { skills } = profile;
      const searchSkills = [];
      skills.forEach(skill => {
        if (query.hasOwnProperty(skill.skillname)) {
          searchSkills.push(skill);
        }
      });
      searchResults.hasSome.push({ ...profile, skills: searchSkills });
    });
    store.dispatch(setSearchResults(searchResults));
  }

  // get results for query when user clicks on search button and store them into state
  async handleSearch(e) {
    e.preventDefault();
    const { state } = this.props;
    const { username } = state.user;
    console.log(username);
    const { searchValues } = state.search;
    if (!Object.keys(searchValues).length) {
      // search field is empty
      store.dispatch(setSearchError(true));
      return;
    }
    const search = {
      username,
      query: this.getSearchQuery(searchValues),
    };
    const Rest = new RestCom(RestPoints.search, JSON.stringify(search));
    // try to send data to api and
    try {
      const { data } = await Rest.post();
      this.storeAllProfiles(data.results);
      this.storeSearchResults(data);
      // show results to user
      store.dispatch(showSearchResults);
    } catch (e) {
      store.dispatch(setError(e.message));
    }
    // remove empty error on submit
    store.dispatch(setSearchError(false));
  }

  render() {
    const { state } = this.props;
    const { search, formState } = state;
    const { showResults, results } = search;
    return (
      <div>
        <SearchForm
          searchField={formState.searchfield}
          onSearch={event => this.handleSearch(event)}
        />
        {showResults && (
          <div>
            <ControlledExpansionPanels
              heading={'Matches all search therms'}
              results={results.hasAll}
            />
            <ControlledExpansionPanels
              heading={'Matches some search therms'}
              results={results.hasSome}
            />
          </div>
        )}
      </div>
    );
  }
}

export default SearchController;
