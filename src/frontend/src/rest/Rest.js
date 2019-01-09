import axios from 'axios';

import { resetState, setLoginError, toggleSpinner } from 'actions';
import store from 'Store';

import RestPoints from 'rest/Init';

const config = require('../config.json');

const { APISERVER } = config;

class RestCom {
  constructor(restPoint, data = {}) {
    // serveradress + rest end point
    this.restApi = APISERVER + restPoint;

    const requestData = data;

    // api requires username for all requests that are secured by login
    const secured = restPoint !== RestPoints.login;
    if (secured) {
      const state = store.getState();
      const { username } = state.user;
      // add username to requestData object
      requestData.username = username;
    }

    this.data = JSON.stringify(requestData);

    this.headers = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    // RestCom is constructed every time a request is made
    // => show loading indicator
    store.dispatch(toggleSpinner(true));
  }

  static errorCodesToErrorMsg(errorCode) {
    switch (errorCode) {
      case 400:
        return 'Wrong login credentials.';
      case 401:
        return 'You need to be logged in to view this page.';
      case 404:
        return 'Couldnt connect to Server. Please try again.';
      case 504:
        return 'Active Directory timeout. Please try again.';
      case 520:
        return 'An unknown error occured. Please try again.';
      default:
        return 'An unknown error occured. Please try again.';
    }
  }

  static handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorMsg = RestCom.errorCodesToErrorMsg(error.response.status);
      if (error.response.status === 401) {
        // user is not logged in and has no permission to do the request
        store.dispatch(resetState);
        store.dispatch(setLoginError(errorMsg));
      } else {
        throw new Error(errorMsg);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      const errorMsg = 'An error occured while connecting to the server. Please check your Internet connection.';
      throw new Error(errorMsg);
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(RestCom.errorCodesToErrorMsg(520));
    }
  }

  static endLoading() {
    // hide loading spinner after request has finished
    store.dispatch(toggleSpinner(false));
  }

  async post() {
    return axios
      .post(this.restApi, this.data, this.headers)
      .then(ServerResponse => ServerResponse.data)
      .finally(RestCom.endLoading)
      .catch(error => RestCom.handleError(error));
  }

  async get() {
    return axios
      .get(this.restApi, this.headers)
      .then(ServerResponse => RestCom.handleThen(ServerResponse))
      .finally(RestCom.endLoading)
      .catch(error => RestCom.handleError(error));
  }

  async delete() {
    return axios
      .delete(this.restApi, this.headers)
      .then(ServerResponse => RestCom.handleThen(ServerResponse))
      .finally(RestCom.endLoading)
      .catch(error => RestCom.handleError(error));
  }
}
export default RestCom;
