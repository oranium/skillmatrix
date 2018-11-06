//import react
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

//import redux
import { createStore } from 'redux';
import reducer from './reducers';
import {updateInput, switchPage, setError, resetForm} from './actions';
import { loadState, saveState} from './localStorage';

//import page parts
import Header from './components/Header';
import Form from './components/Form';

import './index.css';


class App extends Component {
    handleChange(id, value){
        store.dispatch(updateInput(id, value));
    }

    handleSubmit(page){
        const state = this.props.state.formState;
        var submit = true;
        if (this.props.state.page === "form"){
            for (var key in state.inputs){
                var input = state.inputs[key];
                if (input.value === ""){
                    store.dispatch(setError(key, true));
                    submit = false;
                }else {
                    store.dispatch(setError(key, false));
                }
            }
        }
        if (submit){
            store.dispatch(switchPage(page));
        }
    }
    handleResetForm(){
        store.dispatch(resetForm());
    }

  render() {
    return (
        <div>
            <Header username={this.props.state.user}/>
            <main>
                <h1>Neuen Skill erstellen</h1>
                <Form inputs={this.props.state.formState.inputs} page={this.props.state.page} name="test" onChange={(id, value) => this.handleChange(id, value)} onSubmit={(page) => this.handleSubmit(page)} onReset={() => this.handleResetForm()}/>
            </main>
        </div>
    );
  }
}

  // ========================================
  
  const render = () => {
    ReactDOM.render(
        <App state={store.getState()}/>,
        document.getElementById('root')
      );
    console.log(store.getState());
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
