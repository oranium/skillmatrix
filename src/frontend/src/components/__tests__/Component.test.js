import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../LoginForm';
import Form from '../Form';
import Header from '../Header';
import App from '../App';
import Panel from '../Panel'
import ControlledExpansionPanels from '../ControlledExpansionPanels'
import {
  SkillNameInput, DateInput, TextArea, LevelPicker, SearchInput
} from '../InputFields';

const username = 'Valdemar Forsberg';
const password = 'password';

describe('test Login Components', () => {
  const wrapper = shallow(<LoginForm errorMsg="" login={(username, password) => App.handleLogin(username, password)} />);
  it('render Login component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('test Form component', () => {
  const wrapper = shallow(<Form inputs="" page="login" name="test" onChange="" onSubmit="" onClick="" />);
  it('contains important components as children', () => {
    expect(wrapper.contains([<SkillNameInput />, <DateInput />, <TextArea />, <LevelPicker />]));
  });
  it('renders single component correctly', () => {
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
    const wrapper = shallow(<SearchInput />)
    expect(wrapper).toMatchSnapshot();
  });
});


describe('test Panels right', () => {
  const wrapper = shallow(<Panel
    key={1}
    id={1}
    username={username} 
    level={2}
    onChange={() => console.log('test')}
/>);
  it('render Panel component', () => {
    const wrapper = shallow(<Panel
      key={1}
      id={1}
      username={username} 
      level={2}
      onChange={() => console.log('test')}
/>);
    expect(wrapper).toMatchSnapshot();
  });
  it('render ControlledExpansionPanels component', () => {
    const wrapper = shallow(<ControlledExpansionPanels />);
    expect(wrapper).toMatchSnapshot();
  });
});