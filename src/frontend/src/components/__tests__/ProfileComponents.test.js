import React from 'react';
import { shallow } from 'enzyme';

// redux
import store from 'Store';
import {
  setAllSkills, setAllCategories, setUser, setOwnProfile,
} from 'actions';

// import profile/skills components
import Label from '../profile/skills/Label';
import NewMilestoneDialog from '../profile/skills/NewMilestoneDialog';
import NewSkillDialog from '../profile/skills/NewSkillDialog';
import ProfileExpansionPanel from '../profile/skills/ProfileExpansionPanel';
import SkillProfileList from '../profile/skills/SkillProfileList';

// import profile/statistics components

import Chart from '../profile/statistics/Chart';
import ClickableChart from '../profile/statistics/ClickableChart';

// import profile main components

import ProfileController from '../profile/ProfileController';
import TabContainer from '../profile/TabContainer';

// fill store with example data where it's needed
const exStoreJson = '{"formState":{"singleselect":{"value":""},"textfield":{"name":"Skill","value":"","error":false},"levelfield":{"name":"Level","value":"","error":false},"datefield":{"name":"Date","value":"2019-01-11","error":false},"textarea":{"name":"Note","value":"","error":false},"searchfield":{"name":"Search","value":"","error":false}},"page":"profile","drawer":false,"user":{"username":"Karl-Kalagin","name":"Karl Kalagin"},"error":{"hasError":false,"message":"","displayType":1},"search":{"searchValues":[{"value":"Programming/Python/NumPy","label":"Programming/Python/NumPy"}],"results":{"hasAll":[{"username":"Karl-Kalagin","name":"Karl-Kalagin","skills":[{"skillname":"NumPy","skillpath":"Programming/Python/NumPy","milestones":[{"date":"2019-01-11","comment":"Level 3","level":3}],"level":3}]}],"hasSome":[]},"showResults":true,"error":false},"profile":{"person":0,"isEditable":true,"view":0,"showDialog":false,"profiles":[{"username":"Karl-Kalagin","name":"Karl-Kalagin","skills":[{"skillname":"Programming","skillpath":"Programming","level":1,"subcategories":[{"skillname":"Python","skillpath":"Programming/Python","level":4,"subcategories":[{"skillname":"NumPy","skillpath":"Programming/Python/NumPy","level":3,"subcategories":[],"root":false,"milestones":[{"date":"2019-01-11","comment":"Level 3","level":3}]}],"root":false,"milestones":[{"date":"2019-01-11","comment":"Level 1","level":1},{"date":"2019-01-11","comment":"Level 4","level":4}]}],"root":true,"milestones":[]},{"skillname":"Design","skillpath":"Design","level":1,"subcategories":[{"skillname":"Photoshop","skillpath":"Design/Photoshop","level":4,"subcategories":[],"root":false,"milestones":[{"date":"2019-01-16","comment":"I bims der Photoshop Phillip !!","level":4},{"date":"2019-01-11","comment":"Level 4","level":4}]}],"root":true,"milestones":[]},{"skillname":"Sport","skillpath":"Sport","level":1,"subcategories":[{"skillname":"Aikido","skillpath":"Sport/Aikido","level":3,"subcategories":[],"root":false,"milestones":[{"date":"2019-01-11","comment":"Level 3","level":3}]},{"skillname":"Socker","skillpath":"Sport/Socker","level":5,"subcategories":[],"root":false,"milestones":[{"date":"2019-01-11","comment":"Level 5","level":5}]}],"root":true,"milestones":[]}]},{"username":"Karl-Kalagin","name":"Karl-Kalagin","skills":[{"skillname":"Programming","skillpath":"Programming","level":1,"subcategories":[{"skillname":"Python","skillpath":"Programming/Python","level":4,"subcategories":[{"skillname":"NumPy","skillpath":"Programming/Python/NumPy","level":3,"subcategories":[],"root":false,"milestones":[{"date":"2019-01-11","comment":"Level 3","level":3}]}],"root":false,"milestones":[{"date":"2019-01-11","comment":"Level 1","level":1},{"date":"2019-01-11","comment":"Level 4","level":4}]}],"root":true,"milestones":[]},{"skillname":"Design","skillpath":"Design","level":1,"subcategories":[{"skillname":"Photoshop","skillpath":"Design/Photoshop","level":4,"subcategories":[],"root":false,"milestones":[{"date":"2019-01-16","comment":"I bims der Photoshop Phillip !!","level":4},{"date":"2019-01-11","comment":"Level 4","level":4}]}],"root":true,"milestones":[]},{"skillname":"Sport","skillpath":"Sport","level":1,"subcategories":[{"skillname":"Aikido","skillpath":"Sport/Aikido","level":3,"subcategories":[],"root":false,"milestones":[{"date":"2019-01-11","comment":"Level 3","level":3}]}],"root":true,"milestones":[]}]}]},"allSkills":{"Programming/Python":{"1":"Insufficient","2":"Sufficient/Below Average","3":"Satisfactory / Average","4":"Good","5":"Excellent"},"Programming/Python/NumPy":{"1":"Insufficient","2":"Sufficient/Below Average","3":"Satisfactory / Average","4":"Good","5":"Excellent"},"Programming/Python/SQLAlchemy":{"1":"Insufficient","2":"Sufficient/Below Average","3":"Satisfactory / Average","4":"Good","5":"Excellent"},"Design/Photoshop":{"1":"1","2":"2","3":"3","4":"4","5":"5"},"Programming/Java":{"1":"Insufficient","2":"Sufficient/Below Average","3":"Satisfactory / Average","4":"Good","5":"Excellent"},"Design/Skillname":{"1":"hjhjh","2":"h","3":"Satisfactory / Average","4":"Good","5":"Excellent"},"Sport/Kung Fu":{"1":"Insufficient","2":"Sufficient/Below Average","3":"Satisfactory / Average","4":"Good","5":"Excellent"},"Sport/Aikido":{"1":"Insufficient","2":"asdasdasd","3":"Satisfactory / Average","4":"Good","5":"asdsad"},"Sport/Socker":{"1":"","2":"Sufficient/Below Average","3":"Satisfactory / Average","4":"Good","5":"Max"}},"allCategories":["Programming","Design","Sport"],"loading":false,"newSkillToDBDialog":{"skillname":"","guideline":{"1":"Insufficient","2":"Sufficient/Below Average","3":"Satisfactory / Average","4":"Good","5":"Excellent"},"confirmDialogOpen":false,"skillNameIsEmptyError":false}}';
const exStore = JSON.parse(exStoreJson);

store.dispatch(setUser(exStore.user));
store.dispatch(setOwnProfile(exStore.profile.profiles[0]));
store.dispatch(setAllSkills(exStore.allSkills));
store.dispatch(setAllCategories(exStore.allCategories));

const exSkill = {
  skillname: 'Python',
  skillpath: 'C++/Python',
  level: 4,
  milestones: [
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
  ],
  subcategories: [],
};

const exSkill3 = {
  skillname: 'C++',
  skillpath: 'C++',
  level: 3,
  milestones: [
    {
      date: '2011-09-11',
      level: 0,
      comment: 'init',
    },
    {
      date: '2017-01-20',
      level: 1,
      comment: 'C++ Workshop',
    },
    {
      date: '2018-02-06',
      level: 2,
      comment: 'C++ Lehrgang',
    },
    {
      date: '2021-11-23',
      level: 3,
      comment: 'C++ 3 jähriges Projekt fertig gestellt, mit 100000 Zeilen c++ Code',
    },
  ],
  subcategories: [exSkill],
};

describe('test Profile/skills Components', () => {
  it('render Label component', () => {
    const wrapper = shallow(<Label value="Javascript" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render NewMilestoneDialog component', () => {
    const wrapper = shallow(<NewMilestoneDialog open />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render NewSkillDialog component', () => {
    const wrapper = shallow(<NewSkillDialog />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render SkillProfileList component', () => {
    let wrapper = shallow(
      <SkillProfileList
        categories={[{ skillname: 'Java' }, { skillname: 'Python' }, { skillname: 'Haskell' }]}
        isEditable
      />,
    );
    expect(wrapper).toMatchSnapshot();

    wrapper = shallow(
      <SkillProfileList
        categories={[{ skillname: 'Java' }, { skillname: 'Python' }, { skillname: 'Haskell' }]}
        isEditable={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render ProfileExpensionPanel component', () => {
    let wrapper = shallow(<ProfileExpansionPanel skill="Javascript" key={1} isEditable />);
    expect(wrapper).toMatchSnapshot();

    wrapper = shallow(<ProfileExpansionPanel skill="Javascript" key={1} isEditable={false} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('test Profile/stats Components', () => {
  it('render Chart component', () => {
    const wrapper = shallow(<Chart skill={exSkill3.skillname} milestones={exSkill3.milestones} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render SimpleCard component', () => {
    const wrapper = shallow(
      <ClickableChart
        skillpath={exSkill3.skillpath}
        skillname={exSkill3.skillname}
        milestones={exSkill3.milestones}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('test Profile Components', () => {
  it('render ProfileController component', () => {
    const wrapper = shallow(<ProfileController skill="Javascript" data={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render TabContainer component', () => {
    const wrapper = shallow(<TabContainer skill="Javascript" children={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
