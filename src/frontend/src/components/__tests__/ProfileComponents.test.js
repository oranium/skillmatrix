import React from 'react';
import { shallow } from 'enzyme';

// import profile/skills components

import Label from '../profile/skills/Label';
import NewMilestoneDialog from '../profile/skills/NewMilestoneDialog';
import NewSkillDialog from '../profile/skills/NewSkillDialog';
import ProfileExpansionPanel from '../profile/skills/ProfileExpansionPanel';
import SkillProfileList from '../profile/skills/SkillProfileList';

// import profile/statistics components

import Chart from '../profile/statistics/Chart';
import ClickableChart from '../profile/statistics/ClickableChart';
import SkillStatisticsGrid from '../profile/statistics/Chart';

// import profile main components

import ProfileController from '../profile/ProfileController';
import TabContainer from '../profile/TabContainer';

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
  it('render SkillStatisticsGrid component', () => {
    const wrapper = shallow(<SkillStatisticsGrid categories={exSkill3} />);
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
