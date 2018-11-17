import React from 'react';
import { render,shallow, mount } from 'enzyme';
import Login from '../Login';
import Form from '../Form';
import Header from '../Header';
import {SkillNameInput, DateInput, TextArea, LevelPicker} from '../InputFields';



describe("test Login Components",() => {
    const wrapper = shallow(<Login/>);
        it("render Login component", () => {
            expect(wrapper).toMatchSnapshot();
    });
});

describe("test Form component",() =>{
    const wrapper = shallow(<Form inputs={""} page={"login"}/>);
        it("contains important components as children", () => {
            expect(wrapper.contains([<SkillNameInput/> ,<DateInput/>, <TextArea/>, <LevelPicker/>]))            
        });
        it("renders single component correctly", () => {
            expect(wrapper).toMatchSnapshot();
        });
});
   
describe("test Header component", () => {
    const wrapper = shallow(<Header username={"Valdemar"} logout={"handleLogout"}/>);    
        it("render Header component", () => { 
            expect(wrapper).toMatchSnapshot(); 
        });
});
    
describe("test components from InputFields", () =>{
        it("render SkillNameInput from InputFields component", () => {

            const wrapper = shallow(<SkillNameInput data = {"skill"} value={"python"}/>);
            expect(wrapper).toMatchSnapshot();
        });
    
        it("render DateInput from InputFields", () => {

            const wrapper = shallow(<DateInput/>);
            expect(wrapper).toMatchSnapshot(); 
         });
    
        it("render LevelPicker from InputFields", () => {

            const wrapper = shallow(<LevelPicker/>);
            expect(wrapper).toMatchSnapshot(); 
        });
    
        it("render TextArea from InputFields", () => {

            const wrapper = shallow(<TextArea/>);
            expect(wrapper).toMatchSnapshot(); 
        });
});

