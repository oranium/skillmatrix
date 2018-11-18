//import react
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

//import redux
import store from './Store';
import {updateInput, switchPage, setError, resetForm, setUsername, setLoginError} from './actions';


//import page parts
import Header from './components/Header';
import Form from './components/Form';
import LoginForm from './components/LoginForm';

//import functions for usermanagement
import LoginApi from './user/Login';

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

    handleLogout(){
        store.dispatch(switchPage('login'));
    }

    async handleLogin(username, password){
        const loginResponse = await LoginApi(username, password);
        if (loginResponse.success) {
            let username = loginResponse.user.username;
            store.dispatch(setUsername(username));
            store.dispatch(switchPage('form'));
        }else{
            let erroMsg = loginResponse.user.erroMsg;
            console.log(errorMsg);
            store.dispatch(setLoginError(erroMsg));
            store.dispatch(switchPage('login'));
        }
    }

  render() {
      if (this.props.state.page === "login"){
        return (
            <LoginForm errorMsg={this.props.state.errorMsg} login={(username, password) => this.handleLogin(username, password)}/>
        )
      }else{
        return (
            <div>
                <Header username={this.props.state.user} logout={this.handleLogout} />
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

//render App everytime store is updatet 
store.subscribe(render);
//render App on start
render();

export default store;
