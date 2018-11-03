import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {formState} from './reducers';
import {updateInput} from './actions';

import './index.css';

const store = createStore(formState);


function InputField(props) {
    return (
        <input defaultValue={props.value} onChange={(evt)=>props.onChange(evt.target.value, props.index)}></input>
    )
}

class Form extends Component {
    renderInputFields(){
        let inputs = 
            this.props.inputs.map(
                (input, i) => (<InputField  key={i} index={i} value={input.value} onChange={(value, i) => this.props.onChange(value, i)}/>) 
            )
        return inputs;
    }
  render(){
    return (
        <div className="form">
            {this.renderInputFields()}
            <button name="submit" onClick={() => this.props.onSubmit()}>Button</button>
        </div>
    );
  }
}
class App extends Component {
    handleChange(value, i){
        console.log('change');
        console.log(value + ' ' + i);
        updateInput(i, value);
        console.log(store.getState());
    }
    handleSubmit(){
        console.log('submit');
        return
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <main>
            <Form inputs={this.props.value.inputs} name="test" onChange={(value, i) => this.handleChange(value, i)} onSubmit={() => this.handleSubmit()}/>
        </main>
      </div>
    );
  }
}

  // ========================================
  
  ReactDOM.render(
    <App value={store.getState()}/>,
    document.getElementById('root')
  );
