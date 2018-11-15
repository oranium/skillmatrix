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
import Login from './components/Login';

import './index.css';


class App extends Component {

    //user inputs something into an input field
    handleChange(id, value){
        if (this.props.state.formState[id].error){
            store.dispatch(setError(id, false))
        }
        store.dispatch(updateInput(id, value));
    }

    //user clicks button to show form/labels
    handleSubmit(page){
        const inputs = this.props.state.formState;
        var submit = true;
        if (this.props.state.page === "form"){
            for (var key in inputs){
                var input = inputs[key];
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

    //user wants to reset all input fields
    handleResetForm(){
        store.dispatch(resetForm());
    }

    handleLogOut(){
        store.dispatch(switchPage('login'));
    }

    handleLogin(){
        store.dispatch(switchPage('form'));
    }

  render() {
      if (this.props.state.page === "login"){
        return (
            <Login login={this.handleLogin}/>
        )
      }else{
        return (
            <div>
                <Header username={this.props.state.user} logout={this.handleLogOut} />
                <main>
                    <h1>Neuen Skill erstellen</h1>
                    <Form inputs={this.props.state.formState} page={this.props.state.page} name="test" onChange={(id, value) => this.handleChange(id, value)} onSubmit={(page) => this.handleSubmit(page)} onReset={() => this.handleResetForm()}/>
                </main>
            </div>
        );
      }
  }
}

  // ========================================
  
  const render = () => {
    ReactDOM.render(
        <App state={store.getState()}/>,
        document.getElementById('root')
      );
    console.log("State has been changed: ")
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
