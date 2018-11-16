import React from 'react';
import { render,shallow, mount } from 'enzyme';
import Login from '../Login'


test('render Login-Component', () => {
    

    //mockt login aus index.js
    const wrapper = render(<Login/>);
    expect(wrapper).toMatchSnapshot();

});