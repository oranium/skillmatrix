import React from 'react';
import { shallow } from 'enzyme';
import DeleteSkillDialog from '../admin/DeleteSkillDialog';
import NewSkillToDBDialog from '../admin/NewSkillToDBDialog';

describe('test admin Components', () => {
  it('render DeleteSkillDialog component', () => {
    const wrapper = shallow(<DeleteSkillDialog />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render NewSkillToDBDialog component', () => {
    const wrapper = shallow(<NewSkillToDBDialog />);
    expect(wrapper).toMatchSnapshot();
  });
});
