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

//Test
const exProfile1 = {
  username: 'Valdemar Forsberg',
  skills: [
    {
      skillname: 'Java',
      level: 2,
      milestones: [],
    },
    { skillname: 'Python', level: 3, milestones: [] },
    { skillname: 'C', level: 4, milestones: [] },
  ],
};

const exProfile2 = {
  username: 'Yvonne Thompson',
  skills: [
    {
      skillname: 'Java',
      level: 2,
      milestones: [],
    },
    { skillname: 'C#', level: 5, milestones: [] },
  ],
};

const exSearchResult = {
  query: { Python: 1, Java: 1 },
  results: {
    has_all: [exProfile1],
    has_some: [exProfile2],
  },
};

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

  prozessSearchResults = data => {
    const { query, results } = data;
    const { has_all, has_some } = results;
    const allProfiles = has_all.concat(has_some);
    // add all profiles to profile array
    store.dispatch(addProfiles(allProfiles));

    // build map from skills that only match query
    const searchResults = {
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
      profile.skills = searchSkills;
      searchResults.hasAll.push(profile);
    });

    has_some.forEach(profile => {
      const { skills } = profile;
      const searchSkills = [];
      skills.forEach(skill => {
        if (query.hasOwnProperty(skill.skillname)) {
          searchSkills.push(skill);
        }
      });
      profile.skills = searchSkills;
      searchResults.hasSome.push(profile);
    });
    return searchResults;
  };

  // get results for query when user clicks on search button and store them into state
  async handleSearch(e) {
    e.preventDefault();
    const { state } = this.props;
    const { searchValues } = state.search;
    if (!Object.keys(searchValues).length) {
      // search field is empty
      store.dispatch(setSearchError(true));
      return;
    }
    const search = {
      query: this.getSearchQuery(searchValues),
    };
    const Rest = new RestCom(RestPoints.search, JSON.stringify(search));
    // try to send data to api and
    try {
      const { data } = await Rest.post();
      // const data = exSearchResult;
      store.dispatch(setSearchResults(this.prozessSearchResults(data)));
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
            <ControlledExpansionPanels heading={"Matches all search therms"} results={results.hasAll} />
            <ControlledExpansionPanels heading={"Matches some search therms"} results={results.hasSome} />
          </div>
        )}
      </div>
    );
  }
}

export default SearchController;
