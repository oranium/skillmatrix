import axios from 'axios';

const config = require('../config.json');

const errorCodesToErrorMsg = (errorCode) => {
  switch (errorCode) {
    case 400:
      return 'Wrong login credentials.';
    case 404:
      return 'Couldnt connect to Server. Please try again.';
    case 504:
      return 'Active Directory timeout. Please try again.';
    case 520:
      return 'An unknown error occured. Please try again.';
    default:
      return 'An unknown error occured. Please try again.';
  }
};

class RestCom {
  constructor(restPoint, data) {
    this.restApi = config.APISERVER + restPoint;
    console.log(this.restApi);
    this.data = data;
  }

  async post() {
    const headers = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(this.restApi, this.data, headers).catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(errorCodesToErrorMsg(error.response.status));
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw new Error(
          'An error occured while connecting to the server. Please check your Internet connection.',
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(errorCodesToErrorMsg(520));
      }
    });

    return response;
  }
}
export default RestCom;
