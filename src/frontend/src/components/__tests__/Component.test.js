import React from 'react';
import { shallow } from 'enzyme';
import SkillPanelList from 'components/search/SkillPanelList';
import LoginForm from '../login/LoginForm';
import Header from '../header/Header';
import App from '../App';
import {
  SkillNameInput,
  DateInput,
  TextArea,
  LevelPicker,
  SearchInput,
} from '../common/InputFields';

describe('test Login Components', () => {
  const username = 'Valdemar Forsberg';
  const password = 'password';
  const wrapper = shallow(
    <LoginForm errorMsg="" login={() => App.handleLogin(username, password)} />,
  );
  it('render Login component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('test Header component', () => {
  const wrapper = shallow(<Header username="Valdemar" logout="handleLogout" />);
  it('render Header component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('test components from InputFields', () => {
  it('render SkillNameInput from InputFields component', () => {
    const wrapper = shallow(<SkillNameInput data="skill" value="python" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render DateInput from InputFields', () => {
    const wrapper = shallow(<DateInput />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render LevelPicker from InputFields', () => {
    const wrapper = shallow(<LevelPicker />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render TextArea from InputFields', () => {
    const wrapper = shallow(<TextArea />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render SearchInput from InputFields', () => {
    const wrapper = shallow(<SearchInput />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('test ExpensionPanels right', () => {
  it('render SkillPanelList component', () => {
    const wrapper = shallow(<SkillPanelList />);
    expect(wrapper).toMatchSnapshot();
  });
});
