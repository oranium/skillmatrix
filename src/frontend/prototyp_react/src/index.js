//import react
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

//import redux
import { createStore } from 'redux';
import reducer from './reducers';
import {updateInput, switchPage, setError} from './actions';
import { loadState, saveState } from './localStorage';

//import page parts
import Header from './components/Header';
import Form from './components/Form';
import './index.css';


class App extends Component {
    handleChange(value, i){
        store.dispatch(updateInput(i, value));
        console.log("New State: ");
        console.log(this.props.value);
    }
    handleSubmit(page){
        const inputs = store.getState().formState.inputs;
        var submit = true;
        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];
            if (input.value === ""){
                store.dispatch(setError(index, true));
                submit = false;
            }else {
                store.dispatch(setError(index, false));
            }
        }
        if (submit){
            store.dispatch(switchPage(page));
        }
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


// ==============================
// state management with redux
const persistedState = loadState();


const store = createStore(
    reducer,
    persistedState
);


store.subscribe(
    () => 
    {
        saveState(store.getState());
    }
);
store.subscribe(render);

render();
