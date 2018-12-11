import SearchController from 'components/search/SearchController';

const Search = new SearchController();

const exProfile1 = {
  username: 'test1',
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
  username: 'test1',
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

const exProzessedResults = {
  hasAll: [
    {
      username: 'test1',
      skills: [
        {
          skillname: 'Java',
          level: 2,
          milestones: [],
        },
        { skillname: 'Python', level: 3, milestones: [] },
      ],
    },
  ],
  hasSome: [
    {
      username: 'test1',
      skills: [
        {
          skillname: 'Java',
          level: 2,
          milestones: [],
        },
      ],
    },
  ],
};
describe('search tests', () => {
  it('rest response should be prozessed correctly', () => {
    const actResult = Search.prozessSearchResults(exSearchResult);
    expect(actResult).toEqual(exProzessedResults);
  });
});
