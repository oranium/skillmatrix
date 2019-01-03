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
import SimpleCard from '../profile/statistics/SimpleCard';
import SkillStatisticsGrid from '../profile/statistics/Chart';

// import profile main components

import ProfileController from '../profile/ProfileController';
import TabContainer from '../profile/TabContainer';

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
    const wrapper = shallow(<Chart skill="Javascript" data={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render SimpleCard component', () => {
    const wrapper = shallow(<SimpleCard skill="Javascript" data={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render SkillStatisticsGrid component', () => {
    const wrapper = shallow(<SkillStatisticsGrid skill="Javascript" data={[]} />);
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
