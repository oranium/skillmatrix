import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {formState} from './reducers';
import {updateInput} from './actions';
import { loadState, saveState } from './localStorage';

import './index.css';

const persistedState = loadState();
console.log(persistedState);

const store = createStore(
    formState,
    persistedState
);


store.subscribe( () => {
    saveState(store.getState());
});

function InputField(props) {
    switch (props.data.type){
        case "textarea":
            return (
            <div className="mdc-text-field mdc-text-field--textarea textarea">
                <textarea value={props.data.value} id="textarea" className="mdc-text-field__input" rows="8" name={props.data.name} onChange={(evt)=>props.onChange(evt.target.value, props.index)}>
                </textarea>
                <label htmlFor="textarea" className="mdc-floating-label">Note</label>
            </div>
            )
        default:
            let className = "mdc-text-field mdc-text-field--outlined " + props.data.name;
            let id = props.data.name + "-input";

            return (
                <div className={className}>
                <input defaultValue={props.data.value} type={props.data.type} className="mdc-text-field__input"  id={id} name={props.data.name} onChange={(evt)=>props.onChange(evt.target.value, props.index)} required/>
                <label className="mdc-floating-label" htmlFor={id}>{props.data.name}</label>
                <div className="mdc-notched-outline">
                    <svg>
                    <path className="mdc-notched-outline__path"/>
                    </svg>
                </div>
                <div className="mdc-notched-outline__idle"></div>
                </div>
            )
    }
}

class Form extends Component {
    renderInputFields(){
        let inputs = 
            this.props.inputs.map(
                (input, i) => (<InputField  key={i} index={i} data={input} onChange={(value, i) => this.props.onChange(value, i)}/>) 
            )
        return inputs;
    }
  render(){
    return (
        <div className="form">
            {this.renderInputFields()}
            <div className="button-container">
                <button className="mdc-button mdc-button--raised submit" name="submit" onClick={() => this.props.onSubmit()}>Next</button>
            </div>
        </div>
    );
  }
}
class App extends Component {
    handleChange(value, i){
        store.dispatch(updateInput(i, value));
        console.log("New State: ");
        console.log(this.props.value);
    }
    handleSubmit(){
        return
    }
  render() {
    return (
      <div className="App">
            <h1>Neuen Skill erstellen</h1>
            <Form inputs={this.props.value.inputs} name="test" onChange={(value, i) => this.handleChange(value, i)} onSubmit={() => this.handleSubmit()}/>
      </div>
    );
  }
}

  // ========================================
  
  const render = () => {
    ReactDOM.render(
        <App value={store.getState()}/>,
        document.getElementById('root')
      );
  }
  
  store.subscribe(render);
  render();
