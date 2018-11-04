import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducers';
import {updateInput, switchPage} from './actions';
import { loadState, saveState } from './localStorage';

import './index.css';

const persistedState = loadState();

const store = createStore(
    reducer,
    persistedState
);


store.subscribe( () => {
    saveState(store.getState());
    console.log(store.getState());
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

function Label(props){
    return (
        <div>
            <h4>{props.name}</h4>
            <p>{props.value}</p>
        </div>
    )
}

function Header(props) {
    return (
        <header className="mdc-top-app-bar">
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <a href="/" className="material-icons mdc-top-app-bar__navigation-icon">account_circle</a>
            <span className="mdc-top-app-bar__title">{props.username}</span>
          </section>
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
            <a  href="/" className="material-icons mdc-top-app-bar__action-item" aria-label="Print this page" alt="Print this page">settings</a>
            <a href="/" className="material-icons mdc-top-app-bar__action-item" aria-label="Bookmark this page" alt="Bookmark this page">power_settings_new</a>
          </section>
        </div>
      </header>
    )
}

class Form extends Component {
    renderInputFields(){
        let inputs = 
            this.props.inputs.map(
                (input, i) => (<InputField  key={i} index={i} data={input} onChange={(value, i) => this.props.onChange(value, i)}/>) 
            )
        return inputs;
    }
    renderLabels(){
        let labels = 
            this.props.inputs.map(
                (input, i) => (<Label key={i} index={i} name={input.name} value={input.value}/>)
            )
        return labels;
    }
  render(){
      if (this.props.page === "form"){
          return(
            <div className="form">
            {this.renderInputFields()}
            <div className="button-container">
                <button className="mdc-button mdc-button--raised submit" name="submit" onClick={() => this.props.onSubmit("skill")}>Show Skill</button>
            </div>
            </div>
           )
      }else{
        return(
            <div className="form">
            {this.renderLabels()}
            <div className="button-container">
                <button className="mdc-button mdc-button--raised submit" name="submit" onClick={() => this.props.onSubmit("form")}>Edit skill</button>
            </div>
            </div>
        );
      }
  }
}


class App extends Component {
    handleChange(value, i){
        store.dispatch(updateInput(i, value));
        console.log("New State: ");
        console.log(this.props.value);
    }
    handleSubmit(page){
        store.dispatch(switchPage(page));
    }
  render() {
    return (
        <div>
            <Header username={this.props.value.user}/>
            <main>
                <h1>Neuen Skill erstellen</h1>
                <Form inputs={this.props.value.formState.inputs} page={this.props.value.formState.page} name="test" onChange={(value, i) => this.handleChange(value, i)} onSubmit={(page) => this.handleSubmit(page)}/>
            </main>
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
