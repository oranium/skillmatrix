import SearchController from 'components/search/SearchController';

const Search = new SearchController();

const milestones = [
  {
    date: '2015-05-01',
    level: 0,
    comment: 'init',
  },
  {
    date: '2016-05-01',
    level: 1,
    comment: 'reversed engineering buch unters kopfkissen gelegt',
  },
  {
    date: '2016-08-03',
    level: 1,
    comment: 'Buch Hacking with Python gelesen',
  },
  {
    date: '2019-07-06',
    level: 4,
    comment: '72h Python workshop',
  },
];

const exSkill = {
  skillname: 'NumPy',
  skillpath: 'Programming/Python/NumPy',
  level: 4,
  milestones,
  subcategories: [],
};

const exSkillPython = {
  skillname: 'Python',
  skillpath: 'Programming/Python',
  level: 3,
  milestones,
  subcategories: [exSkill],
};
const exSkill2 = {
  skillname: 'Java',
  skillpath: 'Programming/Java',
  level: 5,
  milestones,
  subcategories: [],
};

const exCat = {
  skillname: 'Programming',
  skillpath: 'Programming',
  level: 4,
  milestones: [],
  subcategories: [exSkill2, exSkillPython],
};

const exCat2 = {
  skillname: 'Programming',
  skillpath: 'Programming',
  level: 4,
  milestones: [],
  subcategories: [exSkill2],
};

const exProfile1 = {
  username: 'testuser1',
  skills: [exCat],
};

const exProfile2 = {
  username: 'testuser2',
  skills: [exCat2],
};

const exSearchResult = {
  query: { NumPy: 1, Java: 1 },
  results: {
    has_all: [exProfile1],
    has_some: [exProfile2],
  },
};

const exProzessedResults = {
  hasAll: [
    {
      username: 'testuser1',
      skills: [
        {
          skillname: 'NumPy', skillpath: 'Programming/Python/NumPy', level: 4, milestones,
        },
        {
          skillname: 'Java',
          skillpath: 'Programming/Java',
          level: 5,
          milestones,
        },
      ],
    },
  ],
  hasSome: [
    {
      username: 'testuser2',
      skills: [
        {
          skillname: 'Java',
          skillpath: 'Programming/Java',
          level: 5,
          milestones,
        },
      ],
    },
  ],
};
describe('search tests', () => {
  it('rest response should be prozessed correctly', () => {
    const actResult = Search.storeSearchResults(exSearchResult);
    expect(actResult).toEqual(exProzessedResults);
  });
});
