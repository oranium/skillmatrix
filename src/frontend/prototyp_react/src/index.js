import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
    constructor(props){
        super(props);
        this.state = {
            inputs: [
                {
                    name: "test",
                    value: "test",
                },
                {
                    name: "test",
                    value: "test",
                },
            ],
            test: true,};
    }

    handleChange(value, i){
        console.log('change');
        console.log(value + ' ' + i);
        let inputs = this.state.inputs;
        inputs[i].value = "test";
        this.setState(
            {
                inputs: inputs,
                test: true,
            }
        );
        return
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
            <Form inputs={this.state.inputs} name="test" onChange={(value, i) => this.handleChange(value, i)} onSubmit={() => this.handleSubmit()}/>
        </main>
      </div>
    );
  }
}

  // ========================================
  
  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );
